// mockData.ts - Dữ liệu giả cho hệ thống hoạt động tiếng Việt

import { ActivityData, ActivityType, ReportStatus, ContentType } from './types';

export const mockActivityData: ActivityData[] = [
  {
    id: '1',
    type: ActivityType.QUESTION,
    userId: 'user1',
    title: 'Làm thế nào để implement JWT authentication trong Node.js?',
    content:
      'Tôi cần hướng dẫn chi tiết về cách triển khai xác thực JWT an toàn trong ứng dụng Node.js. Hiện tại tôi đang sử dụng Express.js và muốn tích hợp hệ thống đăng nhập/đăng xuất với JWT tokens.',
    createdAt: '2024-05-30T10:30:00Z',
    upvotes: 15,
    downvotes: 2,
    views: 234,
    answers: 7,
    tags: ['javascript', 'nodejs', 'jwt', 'authentication', 'express'],
    isSolved: true,
  },
  {
    id: '2',
    type: ActivityType.ANSWER,
    userId: 'user1',
    questionTitle: 'Làm thế nào để tối ưu hóa hiệu suất React app?',
    content:
      'Để tối ưu hóa hiệu suất React app, bạn nên sử dụng React.memo cho các component không thay đổi thường xuyên, useCallback và useMemo để tránh re-render không cần thiết. Ngoài ra, hãy sử dụng code splitting với React.lazy và Suspense để giảm kích thước bundle ban đầu.',
    createdAt: '2024-05-29T14:45:00Z',
    upvotes: 12,
    downvotes: 1,
    isChosen: true,
  },
  {
    id: '3',
    type: ActivityType.COMMENT,
    userId: 'user1',
    answerContent: 'Cách tối ưu hóa database PostgreSQL',
    content:
      'Cảm ơn bạn rất nhiều! Giải thích rất chi tiết và dễ hiểu. Tôi đã áp dụng các kỹ thuật indexing mà bạn đề cập và hiệu suất query đã cải thiện đáng kể.',
    createdAt: '2024-05-29T09:15:00Z',
    upvotes: 5,
    downvotes: 0,
  },
  {
    id: '4',
    type: ActivityType.QUESTION_VOTE,
    userId: 'user1',
    questionTitle: 'Cách sử dụng TypeScript với React hiệu quả?',
    voteType: 1,
    createdAt: '2024-05-28T16:20:00Z',
  },
  {
    id: '5',
    type: ActivityType.ANSWER_DOWNVOTE,
    userId: 'user1',
    questionTitle: 'So sánh Vue.js và React - Framework nào tốt hơn?',
    voteType: -1,
    createdAt: '2024-05-28T11:30:00Z',
  },
  {
    id: '6',
    type: ActivityType.QUESTION_EDIT,
    userId: 'user1',
    title: 'Cập nhật: Best practices cho thiết kế RESTful API',
    content:
      'Đã thêm thông tin chi tiết về HTTP status codes và cách xử lý lỗi trong API design. Bổ sung các ví dụ thực tế về pagination và filtering.',
    createdAt: '2024-05-27T13:45:00Z',
    previousTitle: 'Câu hỏi về thiết kế API',
    previousContent: 'Tôi muốn hỏi về cách thiết kế API tốt.',
  },
  {
    id: '7',
    type: ActivityType.ANSWER,
    userId: 'user1',
    questionTitle: 'Cách xử lý lỗi trong Express.js middleware?',
    content:
      'Để xử lý lỗi hiệu quả trong Express.js, bạn nên tạo một error handling middleware tập trung. Sử dụng try-catch trong async functions và luôn gọi next(error) để chuyển lỗi đến error handler. Đừng quên log lỗi để debug sau này.',
    createdAt: '2024-05-27T08:30:00Z',
    upvotes: 18,
    downvotes: 0,
    isChosen: false,
  },
  {
    id: '8',
    type: ActivityType.REPORT,
    userId: 'user1',
    reason: 'Nội dung spam, không liên quan đến câu hỏi',
    status: ReportStatus.PENDING,
    reportedContentType: ContentType.ANSWER,
    createdAt: '2024-05-26T19:00:00Z',
  },
  {
    id: '9',
    type: ActivityType.ANSWER_CHOSEN,
    userId: 'user1',
    questionTitle: 'Cách deploy ứng dụng Node.js lên production?',
    content:
      'Sử dụng PM2 để quản lý process, nginx làm reverse proxy, và Docker để containerization. Đảm bảo set up monitoring và logging.',
    createdAt: '2024-05-26T15:20:00Z',
    upvotes: 25,
    downvotes: 1,
    isChosen: true,
  },
  {
    id: '10',
    type: ActivityType.COMMENT_EDIT,
    userId: 'user1',
    content:
      'Cập nhật: Tôi đã test thêm với MongoDB và kết quả tương tự. Cảm ơn bạn đã chia sẻ kinh nghiệm!',
    previousContent: 'Cảm ơn bạn!',
    createdAt: '2024-05-25T12:10:00Z',
  },
  {
    id: '11',
    type: ActivityType.QUESTION_DELETE,
    userId: 'user1',
    deletedContentTitle: 'Câu hỏi về cách hack website',
    deletedContentType: ContentType.QUESTION,
    createdAt: '2024-05-25T09:45:00Z',
  },
  {
    id: '12',
    type: ActivityType.COMMENT_VOTE,
    userId: 'user1',
    questionTitle: 'Cách sử dụng Git branches hiệu quả?',
    voteType: 1,
    createdAt: '2024-05-24T14:30:00Z',
  },
  {
    id: '13',
    type: ActivityType.QUESTION,
    userId: 'user1',
    title: 'Các pattern phổ biến trong JavaScript ES6+?',
    content:
      'Tôi muốn tìm hiểu về các design patterns hiện đại trong JavaScript như Module pattern, Observer pattern, và cách sử dụng async/await hiệu quả.',
    createdAt: '2024-05-24T10:15:00Z',
    upvotes: 8,
    downvotes: 0,
    views: 156,
    answers: 3,
    tags: ['javascript', 'es6', 'design-patterns', 'async-await'],
    isSolved: false,
  },
  {
    id: '14',
    type: ActivityType.ANSWER_DELETE,
    userId: 'user1',
    deletedContentTitle: 'Cách copy code từ Stack Overflow',
    deletedContentType: ContentType.ANSWER,
    createdAt: '2024-05-23T16:20:00Z',
  },
  {
    id: '15',
    type: ActivityType.REPORT,
    userId: 'user1',
    reason: 'Ngôn ngữ không phù hợp, vi phạm quy tắc cộng đồng',
    status: ReportStatus.REVIEWED,
    reportedContentType: ContentType.COMMENT,
    createdAt: '2024-05-23T11:30:00Z',
  },
  {
    id: '16',
    type: ActivityType.ANSWER_EDIT,
    userId: 'user1',
    questionTitle: 'Cách optimize database queries?',
    content:
      'Cập nhật: Đã thêm ví dụ về compound indexes và explain plan analysis. Bổ sung thông tin về query optimization trong MongoDB.',
    previousContent: 'Sử dụng indexes để tăng tốc queries.',
    createdAt: '2024-05-22T13:45:00Z',
  },
  {
    id: '17',
    type: ActivityType.COMMENT,
    userId: 'user1',
    answerContent: 'Hướng dẫn setup Docker cho development',
    content:
      'Docker Compose file của bạn rất hữu ích! Tôi đã áp dụng và setup được môi trường dev trong 5 phút. Có thể bạn thêm phần về volume mounting không?',
    createdAt: '2024-05-22T08:20:00Z',
    upvotes: 3,
    downvotes: 0,
  },
  {
    id: '18',
    type: ActivityType.QUESTION_DOWNVOTE,
    userId: 'user1',
    questionTitle: 'Cách học lập trình nhanh nhất?',
    voteType: -1,
    createdAt: '2024-05-21T17:10:00Z',
  },
  {
    id: '19',
    type: ActivityType.ANSWER,
    userId: 'user1',
    questionTitle: 'GraphQL vs REST API - Khi nào nên dùng gì?',
    content:
      'GraphQL phù hợp khi bạn cần flexibility trong data fetching và có nhiều client khác nhau. REST vẫn tốt cho các API đơn giản, caching dễ dàng. Chọn based on use case cụ thể của project.',
    createdAt: '2024-05-21T14:30:00Z',
    upvotes: 14,
    downvotes: 2,
    isChosen: false,
  },
  {
    id: '20',
    type: ActivityType.COMMENT_DELETE,
    userId: 'user1',
    deletedContentTitle: 'Bình luận vi phạm quy tắc',
    deletedContentType: ContentType.COMMENT,
    createdAt: '2024-05-20T10:45:00Z',
  },
];

// Thống kê hoạt động
export const getActivityStats = (activities: ActivityData[]) => {
  return {
    totalQuestions: activities.filter((a) => a.type === ActivityType.QUESTION)
      .length,
    totalAnswers: activities.filter((a) => a.type === ActivityType.ANSWER)
      .length,
    totalComments: activities.filter((a) => a.type === ActivityType.COMMENT)
      .length,
    totalVotes: activities.filter((a) =>
      [
        ActivityType.QUESTION_VOTE,
        ActivityType.ANSWER_VOTE,
        ActivityType.COMMENT_VOTE,
        ActivityType.QUESTION_DOWNVOTE,
        ActivityType.ANSWER_DOWNVOTE,
        ActivityType.COMMENT_DOWNVOTE,
      ].includes(a.type),
    ).length,
    totalReports: activities.filter((a) => a.type === ActivityType.REPORT)
      .length,
  };
};

// Helper function để tạo data ngẫu nhiên
export const generateRandomActivity = (): ActivityData => {
  const types = Object.values(ActivityType);
  const randomType = types[Math.floor(Math.random() * types.length)];
  const now = new Date();
  const randomDate = new Date(
    now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000,
  );

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: randomType,
    userId: 'user1',
    createdAt: randomDate.toISOString(),
    title: 'Hoạt động ngẫu nhiên',
    content: 'Nội dung mẫu cho hoạt động này',
    upvotes: Math.floor(Math.random() * 20),
    downvotes: Math.floor(Math.random() * 5),
  };
};
