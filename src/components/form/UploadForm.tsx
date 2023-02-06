import * as React from "react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useAuth } from "../../context/authContext";
import { postArchivo } from "../../services/services";
import { materias } from "../../model/materia/materia";
import { categoriasArchivo } from "../../model/archivo/categoria_archivo";
import { aniosCatedra } from "../../model/catedra/anio_catedra";
import { useSnackbar } from "notistack";
import { getByteArrayFromFile } from "../../utils/fileUtils";
import * as Yup from "yup";
import { SelectField } from "./input/SelectField";
import { DateField } from "./input/DateField";
import moment from "moment/moment";
import { FormTitle } from "./FormTitle";
import { FileField } from "./FileField";

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

export default function UploadForm() {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (values: IFormValues, actions: FormikHelpers<any>) => {
    const extension = values.archivo.type;
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

    getByteArrayFromFile(values.archivo)
      .then((res) => {
        const byteArray = res.toString();
        const fileData = {
          name: nombreFinal,
          extension: extension,
          byteArray: byteArray,
        };

        const scope = {
          catedra: catedra,
          tipo: categoria,
          anioAcademico: anio_catedra,
        };

        postArchivo(values.archivo, scope, fileData, user)
          .then(() => {
            enqueueSnackbar("Archivo subido con exito", { variant: "success" });
          })
          .catch((err: string) => {
            enqueueSnackbar(`Error: ${err}`, { variant: "error" });
            actions.setSubmitting(false);
          });
      })
      .catch((err) => {
        enqueueSnackbar(`Error con el archivo: ${err}`, { variant: "error" });
      });
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
    <div className="w-full flex flex-col justify-center items-center h-full">
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <div className={"p-6 bg-black flex flex-col space-y-4 rounded-md"}>
              <FormTitle title={"Formulario de subida de archivo"} />
              <SelectField
                name={"materia"}
                label="Materia"
                options={Object.entries(materias).map((materia) => ({
                  value: materia[1],
                  label: materia[0],
                }))}
                disabled={props.isSubmitting}
              />
              <SelectField
                name={"categoria"}
                label="Categoria"
                options={Object.entries(categoriasArchivo).map((categoria) => ({
                  value: categoria[1],
                  label: categoria[0],
                }))}
                disabled={props.isSubmitting}
              />
              <SelectField
                name={"anio_catedra"}
                label="Año de la materia"
                options={Object.entries(aniosCatedra).map((año) => ({
                  value: año[1],
                  label: año[0],
                }))}
                disabled={props.isSubmitting}
              />
              <DateField
                name={"fecha"}
                label="Fecha"
                disabled={props.isSubmitting}
              />
              <FileField name={"archivo"} label={"Subir archivo"} />
              <div
                className={`mt-8 p-4 rounded-md text-center cursor-pointer bg-white`}
              >
                <button
                  className="cursor-pointer"
                  type="submit"
                  disabled={props.isSubmitting}
                >
                  Subir archivo
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
