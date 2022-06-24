type BookId = number;

interface Book {
  id: BookId;
  title: string;
  genre?: string;
  coverUrl?: string;
}
