export const mockCategories = [
  {
    _id: "1",
    name: "Web Development",
    slug: "web-development",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
  {
    _id: "2",
    name: "UI/UX Design",
    slug: "ui-ux-design",
    createdAt: "2024-01-02T10:00:00Z",
    updatedAt: "2024-01-02T10:00:00Z",
  },
  {
    _id: "3",
    name: "Backend Development",
    slug: "backend-development",
    createdAt: "2024-01-03T10:00:00Z",
    updatedAt: "2024-01-03T10:00:00Z",
  },
  {
    _id: "4",
    name: "Mobile Development",
    slug: "mobile-development",
    createdAt: "2024-01-04T10:00:00Z",
    updatedAt: "2024-01-04T10:00:00Z",
  },
];

export const mockBlogs = [
  {
    _id: "1",
    title: "Getting Started with React and TypeScript",
    slug: "getting-started-react-typescript",
    image:
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
    categoryId: "1",
    content: `<h2>Setting Up the Project</h2>
    <p>React with TypeScript provides excellent developer experience with type safety and better code organization. In this comprehensive guide, we'll explore how to set up a new React project with TypeScript, configure the development environment, and implement best practices.</p>

    <p>First, create a new React project with TypeScript template:</p>

    <pre><code>npx create-react-app my-app --template typescript</code></pre>

    <p>This command creates a new React application with TypeScript configuration already set up.</p>

    <h2>Key Benefits</h2>
    <ul>
      <li><strong>Type Safety</strong>: Catch errors at compile time</li>
      <li><strong>Better IDE Support</strong>: Enhanced autocomplete and refactoring</li>
      <li><strong>Code Documentation</strong>: Types serve as documentation</li>
      <li><strong>Easier Refactoring</strong>: Confident code changes</li>
    </ul>

    <p>TypeScript transforms your React development experience, making your code more maintainable and less prone to runtime errors.</p>`,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    _id: "2",
    title: "Advanced CSS Grid Layout Techniques",
    slug: "advanced-css-grid-layout-techniques",
    image:
      "https://images.pexels.com/photos/6424586/pexels-photo-6424586.jpeg?auto=compress&cs=tinysrgb&w=800",
    categoryId: "2",
    content: `<h2>Grid Template Areas</h2>
    <p>CSS Grid is a powerful layout system that allows you to create complex, two-dimensional layouts with ease. In this article, we'll explore advanced techniques that will take your CSS Grid skills to the next level.</p>

    <p>One of the most powerful features of CSS Grid is the ability to define named grid areas:</p>

    <pre><code>.container {
      display: grid;
      grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    }</code></pre>

    <h2>Advanced Grid Functions</h2>
    <p>CSS Grid provides several functions for creating flexible layouts:</p>
    <ul>
      <li><strong>minmax()</strong>: Set minimum and maximum sizes</li>
      <li><strong>repeat()</strong>: Repeat track patterns</li>
      <li><strong>fit-content()</strong>: Size based on content</li>
    </ul>

    <p>This creates a flexible grid that automatically adjusts the number of columns based on available space.</p>`,
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-11T16:45:00Z",
  },
  {
    _id: "3",
    title: "Building Scalable Node.js Applications",
    slug: "building-scalable-nodejs-applications",
    image:
      "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800",
    categoryId: "3",
    content: `<h2>Architectural Patterns</h2>
    <p>Building scalable Node.js applications requires careful consideration of architecture, performance, and maintainability. This guide covers essential patterns and practices for creating robust backend systems.</p>

    <h3>MVC Architecture</h3>
    <p>The Model-View-Controller pattern helps organize your application:</p>
    <ul>
      <li><strong>Models</strong>: Data layer and business logic</li>
      <li><strong>Views</strong>: Presentation layer (templates, JSON responses)</li>
      <li><strong>Controllers</strong>: Handle incoming requests and coordinate responses</li>
    </ul>

    <h3>Microservices</h3>
    <p>Break your application into smaller, independent services:</p>
    <ul>
      <li><strong>Service Independence</strong>: Each service can be developed and deployed separately</li>
      <li><strong>Technology Diversity</strong>: Use the best tool for each service</li>
      <li><strong>Fault Isolation</strong>: Issues in one service don't affect others</li>
    </ul>

    <p>These practices will help you build Node.js applications that can handle growth and maintain performance under load.</p>`,
    createdAt: "2024-01-05T14:20:00Z",
    updatedAt: "2024-01-06T11:30:00Z",
  },
];
