import React, { useEffect, useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{12,}$/;

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Votre adresse email est invalide"),
  password: Yup.string()
    .matches(
      regexPassword,
      "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial, et doit avoir au moins 12 caractères"
    ),
});

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({})
  const token = localStorage.getItem('token');

  useEffect(()=>{
    const user = async() => {
      try {
        if(token){
          const decoded = jwtDecode(token)
          setUser(decoded)
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } 
    if(token){
      user()
    }
  }, [token])

  return (
    <MDBContainer fluid  style={{ margin: 0, padding: 0 }}>

    <Navbar/>
      <MDBCard>
        <p className="text-center h1 fw-bold mb-2 mx-1 mx-md-4 mt-4">
          profile
        </p>
      <MDBCard className="text-black m-3" style={{ borderRadius: "25px" }}>
      
        <MDBCardBody>
          <MDBCol
              md="10"
              lg="6"
              className="d-flex flex-column align-items-center"
            >

              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const response = await axios.put(
                      `http://localhost:3306/user/${user.id}`,
                      {
                        email: values.email,
                        password: values.password,
                      }
                    );
                    setSubmitting(false);
                    alert('modification effectué!')
                    navigate("/login");
                  } catch (error) {
                    console.error("Error:", error);
                    setSubmitting(false);
                  }
                }}
              >
                <Form>
                  <div className="d-flex flex-column align-items-center mb-2">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <MDBIcon fas icon="envelope me-3" size="lg" />
                      <Field type="email" name="email" >
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
                      <Field type="password" name="password">
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
                    Update
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
              className="d-flex flex-column align-items-center"
            >
              <Formik
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const response = await axios.delete(
                      `http://localhost:3306/user/${user.id}`,
                    );
                      console.log(response.data)

                    const token = response.data.token;
                    localStorage.setItem("token", token);
                    setSubmitting(false);
                    navigate("/register");
                  } catch (error) {
                    console.error("Error:", error);
                    setSubmitting(false);
                  }
                }}
              >
                <Form>
                <MDBCardBody>{`${user.prenom} ${user.nom}`}</MDBCardBody>
                  <MDBBtn type="submit" className="mb-4" size="lg">
                    supprimer le compte
                  </MDBBtn>
                </Form>
              </Formik>
            </MDBCol>
          
        </MDBCardBody>
      </MDBCard>
      </MDBCard>
      <Footer/>
    </MDBContainer>
    
  );
}

export default App;
