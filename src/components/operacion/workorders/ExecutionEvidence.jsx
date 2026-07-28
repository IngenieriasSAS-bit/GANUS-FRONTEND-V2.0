import {
    Paperclip,
    Trash2,
    Upload,
} from "lucide-react";

export default function ExecutionEvidence({

    evidences = [],

    onFiles,

    onDelete,

}){

    return(

        <section className="wo-evidence-card">

            <div className="wo-section-title">

                <Paperclip size={20}/>

                <div>

                    <h3>

                        Evidencias de ejecución

                    </h3>

                    <p>

                        Adjunte fotografías, documentos y archivos
                        relacionados con la ejecución.

                    </p>

                </div>

            </div>

            <label className="wo-upload">

                <Upload size={28}/>

                <strong>

                    Seleccionar archivos

                </strong>

                <span>

                    Fotografías, PDF, Excel, Word...

                </span>

                <input

                    type="file"

                    multiple

                    hidden

                    onChange={onFiles}

                />

            </label>

            <div className="wo-files">

                {

                    evidences.length===0 && (

                        <p className="wo-empty">

                            No existen evidencias cargadas.

                        </p>

                    )

                }

                {

                    evidences.map(file=>(

                        <div

                            key={file.id}

                            className="wo-file"

                        >

                            <span>

                                {file.name}

                            </span>

                            <button

                                type="button"

                                onClick={()=>onDelete(file.id)}

                            >

                                <Trash2 size={18}/>

                            </button>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}