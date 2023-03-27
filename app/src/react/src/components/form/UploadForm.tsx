import * as React from "react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { materias } from "../../model/materia/materia";
import { categoriasArchivo } from "../../model/archivo/categoria_archivo";
import { aniosCatedra } from "../../model/catedra/anio_catedra";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
import { SelectField } from "./input/SelectField";
import { DateField } from "./input/DateField";
import moment from "moment/moment";
import { FormTitle } from "./FormTitle";
import { FileField } from "./FileField";
import { Card } from "../layout/Card";

interface IFormValues {
  materia: string;
  fecha: string;
  archivo: File;
  categoria: string;
  anio_catedra: string;
}

const formInitialValues: IFormValues = {
  materia: "",
  fecha: moment(new Date()).format("MM-DD-YYYY").toString(),
  archivo: new File([""], ""),
  categoria: "",
  anio_catedra: "",
};

const ipcRenderer = (window as any).ipcRenderer;
let isSubscribed:boolean = false;


export default function UploadForm() {
  const { enqueueSnackbar } = useSnackbar();
  

  const handleSubmit = (values: IFormValues, actions: FormikHelpers<any>) => {
    const catedra = values.materia;
    const categoria = values.categoria;
    const anio_catedra = values.anio_catedra;

    const fecha: string = values.fecha.toString();
    const DD = fecha.split("-")[2];
    const MM = fecha.split("-")[1];
    const YYYY = fecha.split("-")[0];

    const nombreFinal = `${categoria}_${catedra}_${DD}_${MM}_${YYYY}`.replace(
      " ",
      "_"
    );

    const file = {
      name: nombreFinal,
      // @ts-ignore
      pathSource : values.archivo.path,
      extension : values.archivo.type
    };

    const scope = {
      catedra: catedra,
      tipo: categoria,
      anioAcademico: anio_catedra,
    };
    

    if(!isSubscribed){
        isSubscribed = true;

        ipcRenderer.on('upload:complete',  (event: any, data: any) => {
            enqueueSnackbar("Archivo subido con exito", { variant: "success" });
        });

        ipcRenderer.on('upload:fail', (event: any, error: any) => {
            enqueueSnackbar(`Error: ${error}`, { variant: "error" });
            actions.setSubmitting(false);  
        });
    }

    ipcRenderer.send('file:upload', { file: file, scope: scope});
    
  };

  const validationSchema = Yup.object({
    materia: Yup.string().required("Debe seleccionar una materia"),
    categoria: Yup.string().required("Debe seleccionar una categoria"),
    fecha: Yup.date().required("Debe seleccionar una fecha"),
    archivo: Yup.mixed().test(
      "file-loaded",
      "Debe seleccionar un archivo",
      (value) => value.size > 0
    ),
    anio_catedra: Yup.string().required(
      "Debe seleccionar el año de la materia"
    ),
  });

  return (
    <Card>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <div className="space-y-6 mt-6 mb-0">
              <FormTitle title={"Formulario de subida de archivo"} />
              <SelectField
                name={"materia"}
                label="Materia"
                options={Object.entries(materias).map((materia) => ({
                  value: materia[1],
                  label: materia[0],
                }))}
                // disabled={props.isSubmitting}
              />
              <SelectField
                name={"categoria"}
                label="Categoria"
                options={Object.entries(categoriasArchivo).map((categoria) => ({
                  value: categoria[1],
                  label: categoria[0],
                }))}
                // disabled={props.isSubmitting}
              />
              <SelectField
                name={"anio_catedra"}
                label="Año de la materia"
                options={Object.entries(aniosCatedra).map((año) => ({
                  value: año[1],
                  label: año[0],
                }))}
                // disabled={props.isSubmitting}
              />
              <DateField
                name={"fecha"}
                label="Fecha"
                // disabled={props.isSubmitting}
              />
              <FileField name={"archivo"} label={"Subir archivo"} />
              <div
                className={`mt-8 py-1 rounded-md text-center cursor-pointer bg-white space-x-6 flex justify-between`}
              >
                <button
                  className="w-full cursor-pointer inline-block rounded-lg bg-gray-500 py-2 text-sm font-medium text-white"
                  onClick={() => props.resetForm()}
                  type="button"
                  // disabled={props.isSubmitting}
                >
                  Limpiar
                </button>
                <button
                    className="w-full cursor-pointer ml-3 inline-block rounded-lg bg-blue-500 py-2 text-sm font-medium text-white"
                    type="submit"
                    // disabled={props.isSubmitting}
                >
                  Subir archivo
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
