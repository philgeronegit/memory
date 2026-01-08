import { beforeEach, describe, expect, it, vi } from "vitest";
import { NotesService } from "./service";

const notesApiMock = {
  createNote: vi.fn().mockResolvedValue({
    id_note: 1,
    title: "Test Note",
    content: "Test content",
    type: "note",
    is_public: false,
    created_at: "2025-01-01 10:00:00",
    updated_at: "2025-01-02 15:30:00",
    id_programming_language: 1,
    programming_language_name: "JavaScript",
    id_project: 1,
    project_name: "Test Project",
    id_user: 1,
    username: "Test User",
    email: "test@example.com",
    tags: "tag1,tag2",
    total_likes: 5,
    total_dislikes: 2
  }),
  deleteNote: vi.fn().mockResolvedValue(undefined),
  getNote: vi.fn().mockResolvedValue({
    id_note: 1,
    title: "Test Note",
    content: "Test content",
    type: "note",
    is_public: false,
    created_at: "2025-01-01 10:00:00",
    id_programming_language: 1,
    programming_language_name: "JavaScript",
    id_user: 1,
    username: "Test User",
    email: "test@example.com"
  }),
  getNoteScore: vi.fn().mockResolvedValue({ score: 1 }),
  getNotes: vi.fn().mockResolvedValue([
    {
      id_note: 1,
      title: "Note 1",
      content: "Content 1",
      type: "note",
      is_public: true,
      created_at: "2025-01-01 10:00:00",
      id_programming_language: 1,
      programming_language_name: "JavaScript",
      id_user: 1,
      username: "User 1",
      email: "user1@example.com"
    },
    {
      id_note: 2,
      title: "Note 2",
      content: "Content 2",
      type: "note",
      is_public: false,
      created_at: "2025-01-02 11:00:00",
      id_programming_language: 2,
      programming_language_name: "Python",
      id_user: 2,
      username: "User 2",
      email: "user2@example.com"
    }
  ]),
  getUserNotes: vi.fn().mockResolvedValue([]),
  getUserNotesCount: vi.fn().mockResolvedValue([
    { month: "2025-01", month_name: "January", item_count: 5 },
    { month: "2025-02", month_name: "February", item_count: 3 }
  ]),
  shareNote: vi.fn().mockResolvedValue({
    id_note: 1,
    title: "Shared Note",
    content: "Shared content",
    type: "note",
    is_public: true,
    created_at: "2025-01-01 10:00:00",
    id_programming_language: 1,
    programming_language_name: "JavaScript",
    id_user: 1,
    username: "Test User",
    email: "test@example.com"
  }),
  updateNote: vi.fn().mockResolvedValue({
    id_note: 1,
    title: "Updated Note",
    content: "Updated content",
    type: "note",
    is_public: true,
    created_at: "2025-01-01 10:00:00",
    updated_at: "2025-01-03 16:00:00",
    id_programming_language: 1,
    programming_language_name: "JavaScript",
    id_user: 1,
    username: "Test User",
    email: "test@example.com"
  }),
  updateNoteScore: vi.fn().mockResolvedValue({
    id_note: 1,
    title: "Test Note",
    content: "Test content",
    type: "note",
    is_public: false,
    created_at: "2025-01-01 10:00:00",
    id_programming_language: 1,
    programming_language_name: "JavaScript",
    id_user: 1,
    username: "Test User",
    email: "test@example.com",
    score: 1
  })
};

describe("NotesService", () => {
  let notesService: NotesService;

  beforeEach(() => {
    vi.clearAllMocks();
    notesService = new NotesService(notesApiMock);
  });

  it("should create a note", async () => {
    const input = {
      title: "Test Note",
      content: "Test content",
      type: "note",
      is_public: false,
      id_programming_language: 1,
      id_project: 1,
      id_user: 1
    };

    const result = await notesService.createNote(input);

    expect(notesApiMock.createNote).toHaveBeenCalledWith(input);
    expect(result.title).toBe("Test Note");
    expect(result.content).toBe("Test content");
    expect(result.tags).toEqual(["tag1", "tag2"]);
  });

  it("should delete a note", async () => {
    await notesService.deleteNote(1);
    expect(notesApiMock.deleteNote).toHaveBeenCalledWith(1);
  });

  it("should get a note by ID", async () => {
    const result = await notesService.getNote(1);

    expect(notesApiMock.getNote).toHaveBeenCalledWith(1);
    expect(result?.id).toBe(1);
    expect(result?.title).toBe("Test Note");
  });

  it("should return null when note ID is undefined", async () => {
    const result = await notesService.getNote(undefined);
    expect(result).toBeNull();
    expect(notesApiMock.getNote).not.toHaveBeenCalled();
  });

  it("should get note score", async () => {
    const result = await notesService.getNoteScore(1, 1);

    expect(notesApiMock.getNoteScore).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual({ score: 1 });
  });

  it("should return null when getting note score without ID or userId", async () => {
    const result1 = await notesService.getNoteScore(undefined, 1);
    const result2 = await notesService.getNoteScore(1, undefined);

    expect(result1).toBeNull();
    expect(result2).toBeNull();
  });

  it("should get all notes", async () => {
    const result = await notesService.getNotes();

    expect(notesApiMock.getNotes).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Note 1");
    expect(result[1].title).toBe("Note 2");
  });

  it("should get user notes", async () => {
    const result = await notesService.getUserNotes(1);

    expect(notesApiMock.getUserNotes).toHaveBeenCalledWith(1);
    expect(Array.isArray(result)).toBe(true);
  });

  it("should get user notes count", async () => {
    const result = await notesService.getUserNotesCount(1);

    expect(notesApiMock.getUserNotesCount).toHaveBeenCalledWith(1);
    expect(result).toHaveLength(2);
    expect(result[0].monthName).toBe("January");
    expect(result[0].itemCount).toBe(5);
  });

  it("should share a note", async () => {
    const input = { note_id: 1, user_id: 2 };
    const result = await notesService.shareNote(input);

    expect(notesApiMock.shareNote).toHaveBeenCalledWith(input);
    expect(result.title).toBe("Shared Note");
    expect(result.isPublic).toBe(true);
  });

  it("should update a note", async () => {
    const input = { id: 1, title: "Updated Note", content: "Updated content" };
    const result = await notesService.updateNote(input);

    expect(notesApiMock.updateNote).toHaveBeenCalledWith(input);
    expect(result.title).toBe("Updated Note");
    expect(result.content).toBe("Updated content");
  });

  it("should update note score", async () => {
    const input = { id: 1, user_id: 1, score: 1 };
    const result = await notesService.updateNoteScore(input);

    expect(notesApiMock.updateNoteScore).toHaveBeenCalledWith(input);
    expect(result.score).toBe(1);
  });
});
