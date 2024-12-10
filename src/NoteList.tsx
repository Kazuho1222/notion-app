import { Note } from "./Note";

type Props = {
  notes: Note[];
  selectNoteId: number | null;
  onSelect: (note: Note) => void;
};

const NoteList: React.FC<Props> = ({ notes, selectNoteId, onSelect }) => {
  return (
    <ul className="space-y-2">
      {notes.map((note) => (
        <li
          key={note.id}
          onClick={() => onSelect(note)}
          className={`cursor-pointer rounded p-2 flex justify-between ${selectNoteId === note.id ? 'bg-blue-100' : 'bg-white'}`}
        >
          <span>{note.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
