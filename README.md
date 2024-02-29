### **Project Overview**

Our project is a web application designed to streamline task management for teams. The application provides functionalities for uploading and managing videos, organizing tasks with titles and parent titles, and leveraging AI suggestions for title recommendations. Our target audience includes project managers, team leaders, and team members who need a centralized platform for efficient task management and collaboration.

### **Installation Instructions**

To set up the project locally, follow these steps:

1. Clone the repository from GitHub:
    
    ```bash
    git clone https://github.com/DakhchOussama/Phoenix-Project.git
    ```
    
2. Navigate to the project directory:
    
    ```bash
    cd Phoenix-Project
    ```
    
3. Install dependencies using npm:
    
    ```
    npm install
    ```
    

### **Running the Application**

Once the dependencies are installed, you can run the application using the following command:

```sql
npm run build && npm run start
```

This command will start the development server, and you can access the application by navigating to **`http://localhost:3000`** in your web browser.

### **Architectural Overview**

Our application follows a modular architecture with a frontend built using React.js. For the backend, we have implemented a mock server using JSON Server. This mock server serves as a simulated backend environment for testing and development purposes.

The frontend structure is organized into components, including **`Aside`**, **`Section`**, **`Title`**, **`UploadOptions`**, and **`UploadProgress`**. These components interact with each other to provide seamless task management functionalities. The **`Aside`** component handles sidebar navigation and video uploading, while the **`Section`** component manages the main content area for displaying and organizing selected videos. The **`Title`** component facilitates video title management, including adding titles and parent titles, and integrates with an AI service for title suggestions. Additionally, the **`UploadOptions`** component offers users various upload options, and the **`UploadProgress`** component displays real-time progress for video uploads.

### **Key Design Choices**

1. **User Experience**: We focused on creating a clean and intuitive user interface to enhance user experience. Features such as drag-and-drop task management and real-time updates improve usability.
2. **Scalability**: The application is designed to scale with the growing needs of the team. We adopted a modular architecture that allows for easy integration of new features and enhancements.
3. **Maintainability**: By following best practices such as component-based architecture and separation of concerns, we ensure that the codebase remains maintainable and easy to understand for future development and maintenance efforts. Additionally, the use of testing frameworks ensures the reliability and stability of the application over time.
