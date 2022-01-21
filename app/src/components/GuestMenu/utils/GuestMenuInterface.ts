export interface GuestMenuProps {
  handleMenu(): void
  setCalendarPopUpStatus: React.Dispatch<React.SetStateAction<boolean>>;
  isActiveLocationBox: React.Dispatch<React.SetStateAction<boolean>>;
  activeModel: boolean;
}