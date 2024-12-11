import { useState } from "react";
import { Note } from "./Note";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

type Props = {
  notes: Note[];
  selectNoteId: number | null;
  onSelect: (note: Note) => void;
  handleChangeTitle: (title: string) => void;
  handleDeleteNote: (id: number) => void;
};

const NoteList: React.FC<Props> = ({ notes, selectNoteId, onSelect, handleChangeTitle, handleDeleteNote }) => {
  const [editingTitle, setEditingTitle] = useState("");
  const [selectEditTitleNoteId, setSelectEditTitleNoteId] = useState<number | null>(null);
  return (
    <ul className="space-y-2">
      {notes.map((note) => (
        <li
          key={note.id}
          onClick={() => onSelect(note)}
          className={`cursor-pointer rounded p-2 flex justify-between ${selectNoteId === note.id ? 'bg-blue-100' : 'bg-white'}`}
        >
          {selectEditTitleNoteId === note.id ? (
            <input
              name="title"
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleChangeTitle(editingTitle);
                  setSelectEditTitleNoteId(null);
                }
              }}
            />
          ) : (
            <span>{note.title}</span>
          )}
          <div className="flex items-center">
            <button
              className="text-blue-500"
              onClick={() => {
                setEditingTitle(note.title);
                setSelectEditTitleNoteId(note.id);
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button
              className="ml-4 text-red-500"
              onClick={() => handleDeleteNote(note.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
