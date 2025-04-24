import Tag from '@/types/Tag';

const mockTagList: Tag[] = [
  {
    id: '1',
    name: 'javascript',
    descriptionEn:
      'A versatile and widely used scripting language for web development, enabling dynamic and interactive web pages, backend services, and cross-platform applications.',
    descriptionVi:
      'Một ngôn ngữ lập trình linh hoạt và phổ biến cho phát triển web, cho phép xây dựng các trang web động, dịch vụ backend và ứng dụng đa nền tảng.',
    questionCount: 500,
  },
  {
    id: '2',
    name: 'python',
    descriptionEn:
      'A powerful, readable, and beginner-friendly programming language, popular for data science, machine learning, web development, and automation tasks across various industries.',
    descriptionVi:
      'Ngôn ngữ lập trình mạnh mẽ, dễ đọc và thân thiện với người mới, được ưa chuộng trong khoa học dữ liệu, máy học, phát triển web và tự động hóa.',
    questionCount: 450,
  },
  {
    id: '3',
    name: 'react',
    descriptionEn:
      'A JavaScript library for building interactive and reusable user interfaces, commonly used for single-page applications and component-based front-end development.',
    descriptionVi:
      'Thư viện JavaScript để xây dựng giao diện người dùng tương tác và tái sử dụng, thường dùng cho ứng dụng đơn trang và phát triển front-end theo hướng component.',
    questionCount: 400,
  },
  {
    id: '4',
    name: 'typescript',
    descriptionEn:
      'A strongly typed superset of JavaScript that enhances code quality, scalability, and maintainability for large applications with static type checking.',
    descriptionVi:
      'Một phần mở rộng của JavaScript có kiểu tĩnh, giúp cải thiện chất lượng, khả năng mở rộng và bảo trì mã nguồn trong các ứng dụng lớn.',
    questionCount: 350,
  },
  {
    id: '5',
    name: 'node.js',
    descriptionEn:
      'A runtime environment for executing JavaScript on the server, allowing for scalable and efficient backend development with event-driven architecture.',
    descriptionVi:
      'Môi trường chạy JavaScript phía server, cho phép phát triển backend hiệu quả và mở rộng với kiến trúc hướng sự kiện.',
    questionCount: 370,
  },
  {
    id: '6',
    name: 'html',
    descriptionEn:
      'The foundational markup language used to structure and display content on the web, working alongside CSS and JavaScript for website development.',
    descriptionVi:
      'Ngôn ngữ đánh dấu cơ bản để cấu trúc và hiển thị nội dung trên web, hoạt động cùng với CSS và JavaScript để xây dựng website.',
    questionCount: 320,
  },
  {
    id: '7',
    name: 'css',
    descriptionEn:
      'A stylesheet language that defines the look and feel of web pages, enabling responsive design, animations, and flexible layouts with stylesheets.',
    descriptionVi:
      'Ngôn ngữ định kiểu giúp thiết kế giao diện trang web, hỗ trợ thiết kế responsive, hoạt ảnh và bố cục linh hoạt.',
    questionCount: 330,
  },
  {
    id: '8',
    name: 'next.js',
    descriptionEn:
      'A React-based framework for building optimized web applications, supporting server-side rendering, static site generation, and API routes.',
    descriptionVi:
      'Framework dựa trên React để xây dựng ứng dụng web tối ưu, hỗ trợ render phía server, tạo site tĩnh và route API.',
    questionCount: 250,
  },
  {
    id: '9',
    name: 'mongodb',
    descriptionEn:
      'A flexible, document-based NoSQL database designed for high-performance applications, providing scalability and easy data storage solutions.',
    descriptionVi:
      'Cơ sở dữ liệu NoSQL linh hoạt dạng tài liệu, phù hợp cho ứng dụng hiệu năng cao với khả năng mở rộng tốt và lưu trữ dữ liệu dễ dàng.',
    questionCount: 200,
  },
  {
    id: '10',
    name: 'docker',
    descriptionEn:
      'A containerization platform that simplifies application deployment by packaging dependencies, ensuring consistency across environments and streamlining development workflows.',
    descriptionVi:
      'Nền tảng container hóa giúp triển khai ứng dụng dễ dàng bằng cách đóng gói các phụ thuộc, đảm bảo nhất quán giữa các môi trường và tối ưu hóa quy trình phát triển.',
    questionCount: 270,
  },
  {
    id: '11',
    name: 'c++',
    descriptionEn:
      'A high-performance programming language with object-oriented and low-level capabilities, commonly used in game development, systems programming, and embedded software.',
    descriptionVi:
      'Ngôn ngữ lập trình hiệu suất cao, hỗ trợ hướng đối tượng và lập trình cấp thấp, thường dùng trong phát triển game, lập trình hệ thống và phần mềm nhúng.',
    questionCount: 310,
  },
  {
    id: '12',
    name: 'c#',
    descriptionEn:
      'A modern, object-oriented programming language developed by Microsoft, widely used for game development, enterprise applications, and cross-platform development.',
    descriptionVi:
      'Ngôn ngữ lập trình hiện đại, hướng đối tượng do Microsoft phát triển, được dùng nhiều trong phát triển game, ứng dụng doanh nghiệp và đa nền tảng.',
    questionCount: 290,
  },
  {
    id: '13',
    name: 'go',
    descriptionEn:
      'A statically typed, compiled programming language designed for efficiency and simplicity, often used for microservices, cloud computing, and concurrent applications.',
    descriptionVi:
      'Ngôn ngữ lập trình biên dịch có kiểu tĩnh, được thiết kế để đơn giản và hiệu quả, thường dùng cho microservice, điện toán đám mây và ứng dụng song song.',
    questionCount: 220,
  },
  {
    id: '14',
    name: 'rust',
    descriptionEn:
      'A systems programming language known for safety, speed, and concurrency, widely used for performance-critical applications and low-level development.',
    descriptionVi:
      'Ngôn ngữ lập trình hệ thống nổi tiếng với độ an toàn, tốc độ và khả năng song song, dùng cho ứng dụng yêu cầu hiệu suất cao và lập trình cấp thấp.',
    questionCount: 180,
  },
  {
    id: '15',
    name: 'kotlin',
    descriptionEn:
      'A concise and expressive programming language, fully interoperable with Java, primarily used for Android development and cross-platform applications.',
    descriptionVi:
      'Ngôn ngữ lập trình ngắn gọn, dễ diễn đạt và tương thích hoàn toàn với Java, chủ yếu dùng trong phát triển Android và ứng dụng đa nền tảng.',
    questionCount: 260,
  },
  {
    id: '16',
    name: 'swift',
    descriptionEn:
      'A modern programming language for iOS, macOS, watchOS, and tvOS development, offering safety, performance, and ease of use for Apple platforms.',
    descriptionVi:
      'Ngôn ngữ lập trình hiện đại cho iOS, macOS, watchOS và tvOS, cung cấp sự an toàn, hiệu suất và dễ sử dụng cho hệ sinh thái Apple.',
    questionCount: 230,
  },
];

export default mockTagList;
