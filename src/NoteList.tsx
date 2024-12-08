import { Note } from "./Note";

type Props = {
  notes: Note[];
};

const NoteList: React.FC<Props> = ({ notes }) => {
  return (
    <ul className="space-y-2">
      {notes.map((note) => (
        <li
          key={note.id}
          className={`cursor-pointer rounded p-2 flex justify-between`}
        >
          <span>{note.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
