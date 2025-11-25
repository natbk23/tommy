// Define the structure of the Author data from the join
interface Author {
  name: string;
}

// Define the structure of the Book data returned by the Supabase query
export interface Book {
  id: string; // or number, if you changed the ID type
  title: string;
  cover_url: string;
  // This property holds the joined author data
  authors: Author;
  why: string;
  // Add other properties you fetched, e.g.,
  // description: string;
  // rating: number | null;
}