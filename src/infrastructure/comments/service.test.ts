import { beforeEach, describe, expect, it, vi } from "vitest";
import { CommentsService } from "./service";

const commentsApiMock = {
  createComment: vi.fn().mockResolvedValue({
    id_comment: 1,
    content: "Test comment",
    created_at: "2025-01-01 10:00:00",
    updated_at: null,
    id_user: 1,
    username: "Test User",
    email: "test@example.com",
    score: 0,
    total_likes: 0,
    total_dislikes: 0
  }),
  deleteComment: vi.fn().mockResolvedValue(undefined),
  getComments: vi.fn().mockResolvedValue([
    {
      id_comment: 1,
      content: "Comment 1",
      created_at: "2025-01-01 10:00:00",
      updated_at: null,
      id_user: 1,
      username: "User 1",
      email: "user1@example.com",
      score: 0,
      total_likes: 5,
      total_dislikes: 1
    },
    {
      id_comment: 2,
      content: "Comment 2",
      created_at: "2025-01-02 11:00:00",
      updated_at: null,
      id_user: 2,
      username: "User 2",
      email: "user2@example.com",
      score: 0,
      total_likes: 3,
      total_dislikes: 0
    }
  ]),
  updateComment: vi.fn().mockResolvedValue({
    id_comment: 1,
    content: "Updated comment",
    created_at: "2025-01-01 10:00:00",
    updated_at: "2025-01-03 10:00:00",
    id_user: 1,
    username: "Test User",
    email: "test@example.com",
    score: 0,
    total_likes: 0,
    total_dislikes: 0
  }),
  updateCommentScore: vi.fn().mockResolvedValue({
    id_comment: 1,
    content: "Test comment",
    created_at: "2025-01-01 10:00:00",
    updated_at: null,
    id_user: 1,
    username: "Test User",
    email: "test@example.com",
    score: 1,
    total_likes: 1,
    total_dislikes: 0
  })
};

describe("CommentsService", () => {
  let commentsService: CommentsService;

  beforeEach(() => {
    vi.clearAllMocks();
    commentsService = new CommentsService(commentsApiMock);
  });

  it("should create a comment", async () => {
    const input = {
      content: "Test comment",
      id_item: 1,
    };

    const result = await commentsService.createComment(input);

    expect(commentsApiMock.createComment).toHaveBeenCalledWith(input);
    expect(result.id).toBe(1);
    expect(result.content).toBe("Test comment");
  });

  it("should delete a comment", async () => {
    await commentsService.deleteComment(1);
    expect(commentsApiMock.deleteComment).toHaveBeenCalledWith(1);
  });

  it("should get comments for a note", async () => {
    const result = await commentsService.getComments(1);

    expect(commentsApiMock.getComments).toHaveBeenCalledWith(1);
    expect(result).toHaveLength(2);
    expect(result[0].content).toBe("Comment 1");
    expect(result[1].content).toBe("Comment 2");
  });

  it("should update a comment", async () => {
    const input = {
      id: 1,
      content: "Updated comment"
    };

    const result = await commentsService.updateComment(input);

    expect(commentsApiMock.updateComment).toHaveBeenCalledWith(input);
    expect(result.content).toBe("Updated comment");
  });

  it("should update comment score", async () => {
    const input = {
      id: 1,
      user_id: 1,
      score: 1
    };

    const result = await commentsService.updateCommentScore(input);

    expect(commentsApiMock.updateCommentScore).toHaveBeenCalledWith(input);
    expect(result.score).toBe(1);
    expect(result.totalLikes).toBe(1);
  });
});
