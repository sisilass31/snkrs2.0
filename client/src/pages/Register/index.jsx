import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{12,}$/;

const validationSchema = Yup.object({
  nom: Yup.string().required("Veuillez remplir le champ"),
  prenom: Yup.string().required("Veuillez remplir le champ"),
  email: Yup.string()
    .email("Votre adresse email est invalide")
    .required("Veuillez remplir le champ"),
  password: Yup.string()
    .required("Veuillez remplir le champ")
    .matches(
      regexPassword,
      "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial, et doit avoir au moins 12 caractères"
    ),
});

function App() {
  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                register
              </p>

              <Formik
                initialValues={{
                  nom: "",
                  prenom: "",
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const response = await axios.post(
                      "http://localhost:3306/user/register",
                      {
                        nom: values.nom,
                        prenom: values.prenom,
                        email: values.email,
                        password: values.password,
                      }
                    );
                  } catch (error) {
                    console.error("Error:", error);
                    setSubmitting(false);
                  }
                }}
              >
                <Form>
                  <div className="d-flex flex-column align-items-center mb-2">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <MDBIcon fas icon="user me-3" size="lg" />
                      <Field type="text" name="nom">
                        {({ field }) => (
                          <>
                            <MDBInput
                              label="Your Name"
                              id="form1"
                              {...field}
                              className="w-100"
                            />
                          </>
                        )}
                      </Field>
                    </div >
                    <div className="d-flex flex-end">
                    <ErrorMessage
                      name="nom"
                      component="div"
                      className="text-danger"
                    />
                    </div>
                    
                  </div>

                  <div className="d-flex flex-column align-items-center mb-2">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <MDBIcon fas icon="user me-3" size="lg" />
                      <Field type="text" name="prenom" >
                        {({ field }) => (
                          <>
                            <MDBInput
                              label="Your Name"
                              id="form2"
                              {...field}
                              className="w-100"
                            />
                          </>
                        )}
                      </Field>
                    </div>
                    <div className="d-flex flex-end">
                    <ErrorMessage
                      name="prenom"
                      component="div"
                      className="text-danger"
                    />
                    </div>
                  </div>

                  <div className="d-flex flex-column align-items-center mb-2">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <MDBIcon fas icon="envelope me-3" size="lg" />
                      <Field type="email" name="email">
                        {({ field }) => (
                          <>
                            <MDBInput
                              label="Your Email"
                              id="form3"
                              {...field}
                            />
                          </>
                        )}
                      </Field>
                    </div>
                    <div className="d-flex flex-end">
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                    </div>
                  </div>

                  <div className="d-flex flex-column align-items-center mb-2">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <MDBIcon fas icon="lock me-3" size="lg" />
                      <Field type="password" name="password" >
                        {({ field }) => (
                          <>
                            <MDBInput label="Password" id="form4" type="password" {...field} />
                          </>
                        )}
                      </Field>
                    </div>
                    <div className="d-flex flex-end">
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger d-flex flex-end"
                    />
                    </div>
                  </div>

                  <MDBBtn type="submit" className="mb-4" size="lg">
                    Register
                  </MDBBtn>
                  <div className="d-flex flex-end">
                  <ErrorMessage
                    name="_error"
                    component="div"
                    className="text-danger"
                  />
                  </div>
                </Form>
              </Formik>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default App;
