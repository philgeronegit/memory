import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Note } from "./note";

// Mock the infrastructure services
vi.mock("@/infrastructure/notes", () => ({
  default: {
    getNote: vi.fn(),
    getNoteScore: vi.fn(),
    updateNote: vi.fn(),
    updateNoteScore: vi.fn()
  }
}));

vi.mock("@/infrastructure/programming-language", () => ({
  default: {
    getProgrammingLanguages: vi.fn()
  }
}));

// Mock the store
vi.mock("@/store/useNotesStore", () => ({
  default: vi.fn(() => ({
    roleUser: { id: 1, username: "Test User" },
    selectedNoteId: 1,
    setNoteContent: vi.fn()
  }))
}));

// Mock the toast hook
vi.mock("@/hooks/use-toast", () => ({
  useToast: vi.fn(() => ({
    toast: vi.fn()
  }))
}));

// Mock child components
vi.mock("./note-markdown", () => ({
  NoteMarkdown: ({ noteContent }: { noteContent: string }) => (
    <div data-testid="note-markdown">{noteContent}</div>
  )
}));

vi.mock("./note-tags", () => ({
  NoteTags: () => <div data-testid="note-tags">Tags</div>
}));

vi.mock("./share-project-dialog", () => ({
  ShareNoteDialog: () => <div data-testid="share-dialog">Share Dialog</div>
}));

vi.mock("@/components/ui/editable-text", () => ({
  EditableText: ({
    text,
    onChange,
    onSave
  }: {
    text: string;
    onChange: (value: string) => void;
    onSave: () => void;
  }) => (
    <input
      data-testid="editable-title"
      value={text}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onSave}
    />
  )
}));

import { useToast } from "@/hooks/use-toast";
import NotesService from "@/infrastructure/notes";
import ProgrammingLanguageService from "@/infrastructure/programming-language";
import useNotesStore from "@/store/useNotesStore";

describe("Note Component", () => {
  let queryClient: QueryClient;

  const mockNote = {
    id: 1,
    title: "Test Note",
    content: "# Test Content\n\nThis is a test note.",
    idUser: 1,
    username: "Test User",
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-02T15:30:00Z",
    isPublic: false,
    programmingLanguageId: 1,
    projectId: 1,
    totalLikes: 5,
    totalDislikes: 2,
    accessType: "owner"
  };

  const mockNoteScore = {
    score: 0
  };

  const mockProgrammingLanguages = [
    { id: 1, name: "JavaScript" },
    { id: 2, name: "TypeScript" },
    { id: 3, name: "Python" }
  ];

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    });

    // Reset all mocks
    vi.clearAllMocks();

    // Setup default mock implementations
    vi.mocked(NotesService.getNote).mockResolvedValue(mockNote);
    vi.mocked(NotesService.getNoteScore).mockResolvedValue(mockNoteScore);
    vi.mocked(
      ProgrammingLanguageService.getProgrammingLanguages
    ).mockResolvedValue(mockProgrammingLanguages);
    vi.mocked(NotesService.updateNote).mockResolvedValue(mockNote);
    vi.mocked(NotesService.updateNoteScore).mockResolvedValue(mockNoteScore);
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <Note />
      </QueryClientProvider>
    );
  };

  describe("Initial Rendering", () => {
    it("should display loading state initially", () => {
      renderComponent();
      expect(screen.getByText("Chargement...")).toBeInTheDocument();
    });

    it("should display note content after loading", async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByDisplayValue("Test Note")).toBeInTheDocument();
      });

      expect(screen.getByText(/Test Content/)).toBeInTheDocument();
    });

    it("should display creation date and author", async () => {
      renderComponent();

      await waitFor(() => {
        expect(
          screen.getByText(/Créé le 01\/01\/2025 par Test User/)
        ).toBeInTheDocument();
      });
    });

    it("should display modification date when note is updated", async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(/Modifié le/)).toBeInTheDocument();
      });
    });

    it("should show shared project message when accessType is shared", async () => {
      vi.mocked(NotesService.getNote).mockResolvedValue({
        ...mockNote,
        accessType: "shared"
      });

      renderComponent();

      await waitFor(() => {
        expect(
          screen.getByText(/Cette note fait partie d'un projet partagé/)
        ).toBeInTheDocument();
      });
    });
  });

  describe.skip("Error Handling", () => {
    it("should display error message when note fetch fails", async () => {
      const errorMessage = "Failed to fetch note";
      vi.mocked(NotesService.getNote).mockRejectedValue(
        new Error(errorMessage)
      );

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(`Erreur: ${errorMessage}`)).toBeInTheDocument();
      });
    });

    it("should display message when no note is selected", async () => {
      vi.mocked(useNotesStore).mockReturnValue({
        roleUser: { id: 1, username: "Test User" },
        selectedNoteId: undefined,
        setNoteContent: vi.fn()
      } as any);

      vi.mocked(NotesService.getNote).mockResolvedValue(null as any);

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText("Pas de note sélectionnée")).toBeInTheDocument();
      });
    });
  });

  describe.skip("Edit Mode", () => {
    it("should display textarea in edit mode by default", async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByRole("textbox")).toBeInTheDocument();
      });

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveValue(mockNote.content);
    });

    it("should update content when typing in textarea", async () => {
      const user = userEvent.setup();
      const setNoteContent = vi.fn();

      vi.mocked(useNotesStore).mockReturnValue({
        roleUser: { id: 1, username: "Test User" },
        selectedNoteId: 1,
        setNoteContent
      } as any);

      renderComponent();

      await waitFor(() => {
        expect(screen.getByRole("textbox")).toBeInTheDocument();
      });

      const textarea = screen.getByRole("textbox");
      await user.clear(textarea);
      await user.type(textarea, "New content");

      expect(textarea).toHaveValue("New content");
      expect(setNoteContent).toHaveBeenCalled();
    });

    it("should disable editing when user is not the creator", async () => {
      vi.mocked(useNotesStore).mockReturnValue({
        roleUser: { id: 2, username: "Other User" },
        selectedNoteId: 1,
        setNoteContent: vi.fn()
      } as any);

      renderComponent();

      await waitFor(() => {
        expect(screen.getByRole("textbox")).toBeInTheDocument();
      });

      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeDisabled();
    });
  });

  describe.skip("Read Mode", () => {
    it("should switch to read mode when toggle is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();

      await waitFor(() => {
        expect(screen.getByRole("textbox")).toBeInTheDocument();
      });

      const readModeButton = screen.getByTitle("Lire");
      await user.click(readModeButton);

      await waitFor(() => {
        expect(screen.getByTestId("note-markdown")).toBeInTheDocument();
      });
    });
  });

  describe.skip("Note Actions", () => {
    it("should save note when save button is clicked", async () => {
      const user = userEvent.setup();
      const toast = vi.fn();
      vi.mocked(useToast).mockReturnValue({ toast } as any);

      renderComponent();

      await waitFor(() => {
        expect(screen.getByTitle("Sauvegarder")).toBeInTheDocument();
      });

      const saveButton = screen.getByTitle("Sauvegarder");
      await user.click(saveButton);

      await waitFor(() => {
        expect(NotesService.updateNote).toHaveBeenCalledWith({
          id: 1,
          title: "Test Note",
          content: mockNote.content
        });
      });

      expect(toast).toHaveBeenCalledWith({
        title: "Note sauvegardée",
        description: expect.anything()
      });
    });

    it("should update note title", async () => {
      const user = userEvent.setup();
      const toast = vi.fn();
      vi.mocked(useToast).mockReturnValue({ toast } as any);

      renderComponent();

      await waitFor(() => {
        expect(screen.getByTestId("editable-title")).toBeInTheDocument();
      });

      const titleInput = screen.getByTestId("editable-title");
      await user.clear(titleInput);
      await user.type(titleInput, "Updated Title");

      expect(titleInput).toHaveValue("Updated Title");
    });

    it("should toggle public status", async () => {
      const user = userEvent.setup();
      const toast = vi.fn();
      vi.mocked(useToast).mockReturnValue({ toast } as any);

      renderComponent();

      await waitFor(() => {
        expect(screen.getByRole("switch")).toBeInTheDocument();
      });

      const publicSwitch = screen.getByRole("switch");
      await user.click(publicSwitch);

      await waitFor(() => {
        expect(NotesService.updateNote).toHaveBeenCalledWith({
          id: 1,
          is_public: true
        });
      });

      expect(toast).toHaveBeenCalledWith({
        title: "Note sauvegardée",
        description: expect.anything()
      });
    });

    it("should update programming language", async () => {
      const user = userEvent.setup();
      const toast = vi.fn();
      vi.mocked(useToast).mockReturnValue({ toast } as any);

      renderComponent();

      await waitFor(() => {
        expect(screen.getByRole("combobox")).toBeInTheDocument();
      });

      const languageSelect = screen.getByRole("combobox");
      await user.click(languageSelect);

      await waitFor(() => {
        expect(screen.getByText("Python")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Python"));

      await waitFor(() => {
        expect(NotesService.updateNote).toHaveBeenCalledWith({
          id: 1,
          id_programming_language: 3
        });
      });
    });

    it("should disable save and share buttons when user is not the creator", async () => {
      vi.mocked(useNotesStore).mockReturnValue({
        roleUser: { id: 2, username: "Other User" },
        selectedNoteId: 1,
        setNoteContent: vi.fn()
      } as any);

      renderComponent();

      await waitFor(() => {
        expect(screen.getByTitle("Sauvegarder")).toBeInTheDocument();
      });

      const saveButton = screen.getByTitle("Sauvegarder");
      const shareButton = screen.getByTitle("Partager");

      expect(saveButton).toBeDisabled();
      expect(shareButton).toBeDisabled();
    });
  });

  describe.skip("Like/Dislike Actions", () => {
    it("should like note when like button is clicked", async () => {
      const user = userEvent.setup();
      const toast = vi.fn();
      vi.mocked(useToast).mockReturnValue({ toast } as any);

      renderComponent();

      await waitFor(() => {
        expect(screen.getByTitle("Like")).toBeInTheDocument();
      });

      const likeButton = screen.getByTitle("Like");
      await user.click(likeButton);

      await waitFor(() => {
        expect(NotesService.updateNoteScore).toHaveBeenCalledWith({
          id: 1,
          user_id: 1,
          score: 1
        });
      });

      expect(toast).toHaveBeenCalledWith({
        title: "Score sauvegardé",
        description: expect.anything()
      });
    });

    it("should remove like when already liked", async () => {
      const user = userEvent.setup();
      vi.mocked(NotesService.getNoteScore).mockResolvedValue({ score: 1 });

      renderComponent();

      await waitFor(() => {
        expect(screen.getByTitle("Like")).toBeInTheDocument();
      });

      const likeButton = screen.getByTitle("Like");
      await user.click(likeButton);

      await waitFor(() => {
        expect(NotesService.updateNoteScore).toHaveBeenCalledWith({
          id: 1,
          user_id: 1,
          score: 0
        });
      });
    });

    it("should dislike note when dislike button is clicked", async () => {
      const user = userEvent.setup();
      const toast = vi.fn();
      vi.mocked(useToast).mockReturnValue({ toast } as any);

      renderComponent();

      await waitFor(() => {
        expect(screen.getByTitle("Dislike")).toBeInTheDocument();
      });

      const dislikeButton = screen.getByTitle("Dislike");
      await user.click(dislikeButton);

      await waitFor(() => {
        expect(NotesService.updateNoteScore).toHaveBeenCalledWith({
          id: 1,
          user_id: 1,
          score: -1
        });
      });
    });

    it("should remove dislike when already disliked", async () => {
      const user = userEvent.setup();
      vi.mocked(NotesService.getNoteScore).mockResolvedValue({ score: -1 });

      renderComponent();

      await waitFor(() => {
        expect(screen.getByTitle("Dislike")).toBeInTheDocument();
      });

      const dislikeButton = screen.getByTitle("Dislike");
      await user.click(dislikeButton);

      await waitFor(() => {
        expect(NotesService.updateNoteScore).toHaveBeenCalledWith({
          id: 1,
          user_id: 1,
          score: 0
        });
      });
    });

    it("should display like and dislike counts", async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
      });
    });
  });

  describe("Share Dialog", () => {
    it("should open share dialog when share button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();

      await waitFor(() => {
        expect(screen.getByTitle("Partager")).toBeInTheDocument();
      });

      const shareButton = screen.getByTitle("Partager");
      await user.click(shareButton);

      await waitFor(() => {
        expect(screen.getByTestId("share-dialog")).toBeInTheDocument();
      });
    });

    it("should show error when trying to share note without projectId", async () => {
      const user = userEvent.setup();
      const toast = vi.fn();
      vi.mocked(useToast).mockReturnValue({ toast } as any);
      vi.mocked(NotesService.getNote).mockResolvedValue({
        ...mockNote,
        projectId: null as any
      });

      renderComponent();

      await waitFor(() => {
        expect(screen.getByTitle("Partager")).toBeInTheDocument();
      });

      const shareButton = screen.getByTitle("Partager");
      await user.click(shareButton);

      expect(toast).toHaveBeenCalledWith({
        title: "Erreur",
        description: expect.anything()
      });
    });
  });

  describe.skip("Context Menu", () => {
    it("should show context menu on right-click in textarea", async () => {
      const user = userEvent.setup();
      renderComponent();

      await waitFor(() => {
        expect(screen.getByRole("textbox")).toBeInTheDocument();
      });

      const textarea = screen.getByRole("textbox");
      await user.pointer({ keys: "[MouseRight>]", target: textarea });

      await waitFor(() => {
        expect(screen.getByText("Copier")).toBeInTheDocument();
        expect(screen.getByText("Couper")).toBeInTheDocument();
        expect(screen.getByText("Coller")).toBeInTheDocument();
      });
    });
  });
});
