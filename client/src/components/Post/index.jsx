import React, { useEffect, useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Formik, Field, Form, ErrorMessage } from "formik";
import jwtDecode from 'jwt-decode'
import axios from "axios";

function App() {
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
    <MDBContainer fluid style={{ margin: 0, padding: 0 }}>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow className="justify-content-center">
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">
                post
              </p>

              <Formik
                initialValues={{
                  title: "",
                  description: "",
                  pictures: "",
                  userId: `${user.id}`,
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const response = await axios.post(
                      "http://localhost:3306/post/create",
                      {
                        title: values.title,
                        pictures: values.pictures,
                        description: values.description,
                        userId: `${user.id}`,
                      }
                    );
                    console.log(response.data);
                    setSubmitting(false);

                  } catch (error) {
                    console.error("Error:", error);
                    setSubmitting(false);
                  }
                }}
              >
                <Form>
                  <div className="d-flex flex-column align-items-center mb-2">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <Field type="text" name="title">
                        {({ field }) => (
                          <>
                            <MDBInput
                              label="Votre titre"
                              id="form3"
                              {...field}
                            />
                          </>
                        )}
                      </Field>
                    </div>
                    <div className="d-flex flex-end">
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-column align-items-center mb-2">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <Field type="text" name="description">
                        {({ field }) => (
                          <>
                            <MDBInput
                              label="Votre description"
                              id="form4"
                              {...field}
                            />
                          </>
                        )}
                      </Field>
                    </div>
                    <div className="d-flex flex-end">
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-danger d-flex flex-end"
                      />
                    </div>
                  </div>

                  <MDBBtn type="submit" className="mb-4" size="lg">
                    poster
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

          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default App;
