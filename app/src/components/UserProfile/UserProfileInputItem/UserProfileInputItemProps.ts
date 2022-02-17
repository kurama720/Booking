export interface UserProfileInputItemProps {
  value: string;
  handler: React.Dispatch<React.SetStateAction<string>>;
  isLoaded: boolean;
}
