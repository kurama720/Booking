export interface ObjectsPageCardDescriptionProps {
  sideEffect: boolean;
  description: string | undefined;
  feature:
    | { guests: number; beds: number; bedrooms: number; bathrooms: number }
    | undefined;
}
