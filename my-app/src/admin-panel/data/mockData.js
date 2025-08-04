export const mockBlogs = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    slug: "getting-started-react-typescript",
    image:
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["React", "TypeScript", "JavaScript"],
    category: "Development",
    summary:
      "Learn how to set up a React project with TypeScript and best practices for modern web development.",
    content: `React with TypeScript provides excellent developer experience with type safety and better code organization. In this comprehensive guide, we'll explore how to set up a new React project with TypeScript, configure the development environment, and implement best practices.

## Setting Up the Project

First, create a new React project with TypeScript template:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

This command creates a new React application with TypeScript configuration already set up.

## Key Benefits

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Code Documentation**: Types serve as documentation
- **Easier Refactoring**: Confident code changes

## Best Practices

1. Use proper typing for props and state
2. Leverage TypeScript's strict mode
3. Create custom types for your domain objects
4. Use enums for constants

TypeScript transforms your React development experience, making your code more maintainable and less prone to runtime errors.`,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
    status: "published",
  },
  {
    id: "2",
    title: "Advanced CSS Grid Layout Techniques",
    slug: "advanced-css-grid-layout-techniques",
    image:
      "https://images.pexels.com/photos/6424586/pexels-photo-6424586.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["CSS", "Layout", "Design"],
    category: "Design",
    summary:
      "Master CSS Grid with advanced techniques for creating complex, responsive layouts.",
    content: `CSS Grid is a powerful layout system that allows you to create complex, two-dimensional layouts with ease. In this article, we'll explore advanced techniques that will take your CSS Grid skills to the next level.

## Grid Template Areas

One of the most powerful features of CSS Grid is the ability to define named grid areas:

\`\`\`css
.container {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}
\`\`\`

## Advanced Grid Functions

CSS Grid provides several functions for creating flexible layouts:

- **minmax()**: Set minimum and maximum sizes
- **repeat()**: Repeat track patterns
- **fit-content()**: Size based on content

## Responsive Grid Layouts

Create responsive layouts without media queries using auto-fit and auto-fill:

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
\`\`\`

This creates a flexible grid that automatically adjusts the number of columns based on available space.`,
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-11T16:45:00Z",
    status: "published",
  },
  {
    id: "3",
    title: "Building Scalable Node.js Applications",
    slug: "building-scalable-nodejs-applications",
    image:
      "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Node.js", "Backend", "Scalability"],
    category: "Backend",
    summary:
      "Learn architectural patterns and best practices for building scalable Node.js applications.",
    content: `Building scalable Node.js applications requires careful consideration of architecture, performance, and maintainability. This guide covers essential patterns and practices for creating robust backend systems.

## Architectural Patterns

### MVC Architecture
The Model-View-Controller pattern helps organize your application:

- **Models**: Data layer and business logic
- **Views**: Presentation layer (templates, JSON responses)
- **Controllers**: Handle incoming requests and coordinate responses

### Microservices
Break your application into smaller, independent services:

- **Service Independence**: Each service can be developed and deployed separately
- **Technology Diversity**: Use the best tool for each service
- **Fault Isolation**: Issues in one service don't affect others

## Performance Optimization

### Caching Strategies
Implement caching at multiple levels:
- In-memory caching with Redis
- Database query caching
- CDN for static assets

### Database Optimization
- Use connection pooling
- Implement proper indexing
- Consider read replicas for heavy read workloads

## Security Best Practices

1. **Input Validation**: Validate all incoming data
2. **Authentication**: Use JWT tokens securely
3. **Rate Limiting**: Prevent abuse and DDoS attacks
4. **HTTPS**: Always use secure connections

These practices will help you build Node.js applications that can handle growth and maintain performance under load.`,
    createdAt: "2024-01-05T14:20:00Z",
    updatedAt: "2024-01-06T11:30:00Z",
    status: "draft",
  },
];
