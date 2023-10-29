import { PageModes } from './enums';

export type switchEditPgWelcTxtdFunc = (mode: PageModes) => string;

export type closeDialigFunc = (
  e: KeyboardEvent | React.MouseEvent<HTMLButtonElement>
) => void;
