import { useState } from "react";
import { uploadMediaToSupabase, supabase } from "../../utils/mediaUpload";

export default function UploadComponent() {
  const [file, setFile] = useState(null);

  function handleClick() {
    uploadMediaToSupabase(file).then((res) => {
      console.log(res);
    });
    const url = supabase.storage.from("Images").getPublicUrl(file.name);
    console.log(url.data.publicUrl);
  }
  return (
    <div>
      <input
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
        type="file"
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}
