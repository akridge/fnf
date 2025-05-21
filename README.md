# Fish/No-Fish Image Annotator

## Description
This is a simple web-based tool for classifying images as containing "fish" or "no fish". Users are presented with images one by one and can click buttons to record their annotation.

## Features
*   Web interface for easy image annotation.
*   "Fish" / "No Fish" annotation options.
*   Annotations are stored locally in an `annotations.csv` file.
*   Automatically cycles through images located in the `static/images` directory.
*   Skips images that have already been annotated.
*   Clean and simple user interface.
*   Swipe gestures (left for 'no fish', right for 'fish') on the image for quick annotation.

## Prerequisites
*   Python 3.x (e.g., Python 3.7 or newer)
*   `pip` (Python package installer)

## Setup & Installation
1.  **Clone the Repository / Download Files:**
    If this project is in a Git repository, clone it:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
    If you have the files directly, navigate to the project's root directory.

2.  **Create a Python Virtual Environment:**
    It's highly recommended to use a virtual environment to manage project dependencies.
    ```bash
    python3 -m venv .venv
    ```
    (On some systems, you might use `python` instead of `python3`)

3.  **Activate the Virtual Environment:**
    *   **Windows:**
        ```bash
        .venv\Scripts\activate
        ```
    *   **macOS/Linux:**
        ```bash
        source .venv/bin/activate
        ```
    Your command prompt should change to indicate that the virtual environment is active.

4.  **Install Dependencies:**
    Install the required Python packages using `requirements.txt`:
    ```bash
    pip install -r requirements.txt
    ```

## Running the Application
1.  **Activate Virtual Environment:**
    Ensure your virtual environment (e.g., `.venv`) is activated as described in the setup steps.

2.  **Run the Flask Application:**
    Execute the main application file:
    ```bash
    python3 app.py
    ```
    (Or `python app.py` if `python3` is not your command for Python 3)
    You should see output indicating the Flask development server is running, typically on `http://127.0.0.1:5000/`.

3.  **Access in Browser:**
    Open your web browser and navigate to:
    [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

## How to Use
1.  **Add Images:**
    Place the image files you want to annotate into the `static/images/` directory within the project. Supported formats include `.jpg`, `.jpeg`, and `.png`.

2.  **Launch the Application:**
    Follow the "Running the Application" steps above.

3.  **Annotate:**
    *   The application will display the first unannotated image from the `static/images/` folder.
    *   Click the "Fish" button if the image contains a fish.
    *   Click the "No Fish" button if the image does not contain a fish.
    *   Alternatively, you can swipe left on the image for 'no fish' or swipe right for 'fish'.
    *   After you click a button or swipe, your annotation will be saved, and the next unannotated image will be displayed.

4.  **View Annotations:**
    Your annotations (filename and label) are saved in the `annotations.csv` file in the root directory of the project.

5.  **Completion:**
    Once all images in `static/images/` have been annotated, you will see a message: "All images have been annotated. Well done!"

## To Do / Future Enhancements (Optional)
*   Add support for multiple annotation labels or categories.
*   More robust image management (e.g., subfolders, direct upload through UI).
*   User authentication for multiple annotators.
*   Store annotations in a database instead of a CSV file.
*   Improve error handling and user feedback.
*   Add unit and integration tests.