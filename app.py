from flask import Flask, render_template
import os
import csv

app = Flask(__name__)
IMAGE_DIR = 'static/images'
ANNOTATIONS_FILE = 'annotations.csv'

def get_annotated_images():
    """Reads annotations.csv and returns a set of annotated image filenames."""
    annotated = set()
    if not os.path.isfile(ANNOTATIONS_FILE):
        return annotated
    with open(ANNOTATIONS_FILE, 'r', newline='') as csvfile:
        reader = csv.reader(csvfile)
        header = next(reader, None) # Skip header
        if header: # Check if header actually exists
            for row in reader:
                if row: # Ensure row is not empty
                    annotated.add(row[0])
    return annotated

def list_image_files(directory):
    """Lists all image files in the given directory."""
    image_files = []
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            image_files.append(filename)
    return image_files

from flask import request, jsonify

@app.route('/')
def hello():
    all_image_files = list_image_files(IMAGE_DIR)
    annotated_images = get_annotated_images()

    unannotated_images = [img for img in all_image_files if img not in annotated_images]

    current_image_filename = None
    image_path_for_template = None
    all_done = False

    if not all_image_files: # No images in the directory
        all_done = True
    elif unannotated_images:
        current_image_filename = unannotated_images[0]
        image_path_for_template = os.path.join('images', current_image_filename)
    else: # All images have been annotated
        all_done = True

    return render_template(
        'index.html',
        image_path=image_path_for_template,
        current_image_filename=current_image_filename,
        all_done=all_done
    )

@app.route('/annotate', methods=['POST'])
def annotate():
    data = request.get_json()
    filename = data.get('filename')
    annotation = data.get('annotation')

    file_exists = os.path.isfile(ANNOTATIONS_FILE)
    with open(ANNOTATIONS_FILE, 'a', newline='') as csvfile:
        writer = csv.writer(csvfile)
        if not file_exists:
            writer.writerow(['filename', 'label']) # Write header
        writer.writerow([filename, annotation])

    print(f"Annotating {filename} as {annotation}, saved to {ANNOTATIONS_FILE}")
    return jsonify({"status": "success", "filename": filename, "annotation": annotation})

if __name__ == '__main__':
    app.run(debug=True)
