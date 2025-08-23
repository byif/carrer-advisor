export interface Resource {
  title: string;
  icon: string;
  items: {
    name: string;
    author?: string;
    platform?: string;
    type?: string;
    org?: string;
    purchaseUrl?: string;
  }[];
}

export const resources: Resource[] = [
  {
    title: "Essential Books",
    icon: "BookOpen",
    items: [
      {
        name: "Clean Code",
        author: "Robert C. Martin",
        purchaseUrl: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882",
      },
      {
        name: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        purchaseUrl: "https://www.amazon.com/Introduction-Algorithms-fourth-Thomas-Cormen/dp/026204630X",
      },
      {
        name: "Design Patterns",
        author: "Gang of Four",
        purchaseUrl: "https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612",
      },
    ],
  },
  {
    title: "Online Courses",
    icon: "Video",
    items: [
      {
        name: "CS50: Introduction to Computer Science",
        platform: "Harvard/edX",
        purchaseUrl: "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x",
      },
      {
        name: "Machine Learning",
        platform: "Stanford/Coursera",
        purchaseUrl: "https://www.coursera.org/learn/machine-learning",
      },
      {
        name: "Full Stack Open",
        platform: "University of Helsinki",
        purchaseUrl: "https://fullstackopen.com/en/",
      },
    ],
  },
];