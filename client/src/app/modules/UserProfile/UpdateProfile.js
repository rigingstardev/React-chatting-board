import React, { useCallback, useState, useRef, useEffect} from "react";
import { useFormik} from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { register } from "../_redux/authCrud";
import { HeaderMobile } from "../../../../_metronic/layout/components/header-mobile/HeaderMobile";
import { QuickUser } from './../../../../_metronic/layout/components/extras/offcanvas/QuickUser';
import { ScrollTop } from './../../../../_metronic/layout/components/extras/ScrollTop';
import { LayoutInit } from './../../../../_metronic/layout/components/LayoutInit';
import { Footer } from './../../../../_metronic/layout/components/footer/Footer';
import { Header } from './../../../../_metronic/layout/components/header/Header';
import { countryList, domainList, professionList } from "../../../constant";
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ReactCrop from 'react-image-crop';
import './authentication.css';
import 'react-image-crop/dist/ReactCrop.css'
import swal from 'sweetalert2';

const initialValues = {
  profession: "",
  field: "",
  industry: "",
  country: "",
  state: "",
  city: "",
  note: "",
  telephone: "",
  phone: "",
  fax: "",
  website: "",
  avatar: "",
  photo: "",
  email: "",
  username: "",
  password: "",
  changepassword: "",
  acceptTerms: false,
};

const useStyles = (theme => ({
  modalBox:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },
  saveButton:{
    backgroundColor: "blue"
  },
  modalButtonGroup:{
    display: 'flex',
    justifyContent: "space-between",
  }
}));

const SUPPORTED_FORMATS = [
  'image/png',
  'image/jpeg'
]
const initialCrop = {width: 400, height: 400};

const ImageSizeWarning = (width, height) => {
  swal.fire({
    title: "Avertissement!",
    text: `La taille de l'image doit être '${width}px vs ${height}px'!`,
    showClass:{
      popup: "animated flipInX"
    },
    customClass: {
      confirmButton: 'btn'
    },
    confirmButtonColor: '#384553'
  });
}

function UpdateProfile(props) {
  const classes = useStyles();
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(0);
  const avatarInput = useRef(null);
  const photoInput = useRef(null);
  const imgRef = useRef(null);
  const [upImg, setUpImg] = useState();
  const [crop, setCrop] = useState(null);
  const [cropToImage, setCropToImage] = useState(null);
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  
  const handleOpenAvatarModal = () => {setOpenAvatarModal(true);setCrop({width: 400, height: 400});}
  const handleCloseAvatarModal = () => setOpenAvatarModal(false);
  const handleOpenPhotoModal = () => {setOpenPhotoModal(true);setCrop({width: 1140, height: 470});}
  const handleClosePhotoModal = () => setOpenPhotoModal(false);
  
  
  const RegistrationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Format d'e-mail incorrect")
      .min(3, "Au moins 3 symboles")
      .max(50, "50 symboles maximum")
      .required("Ce champ est requis"),
    username: Yup.string()
      .min(3, "Au moins 3 symboles")
      .max(50, "50 symboles maximum")
      .required("Ce champ est requis."),
    password: Yup.string()
      .min(6, "Au moins 6 symboles")
      .max(50, "50 symboles maximum")
      .required("Ce champ est requis."),
    profession: Yup.string()
      .required("Ce champ est requis."),
    industry: Yup.string()
      .required("Ce champ est requis."),
    country: Yup.string()
      .required("Ce champ est requis."),
    city: Yup.string()
      .required("Ce champ est requis."),
    note: Yup.string()
      .required("Ce champ est requis."),
    phone: Yup.string()
      .required("Ce champ est requis."),
    // avatar: Yup.mixed()
    //   .required("Ce champ est requis.")
    //   .test('fileFormat', 'Type de fichier non pris en charge.', (value) => (value && SUPPORTED_FORMATS.includes(value.type)))
    // // .test('fileSize', 'Veuillez vérifier la dimension du fichier.', async (value) => { 
    // //   if(!value) return false;
    // //   const img = new Image();
    // //   img.src = URL.createObjectURL(value);
    // //   return await new Promise(resolve => {
    // //     img.decode().then(() => {
    // //       URL.revokeObjectURL(img.src);
    // //       return resolve(img.width >= 400 && img.height >= 400);
    // //     });
    // //   });
    // // }),
    // ,
    photo: Yup.mixed()
      .required("Ce champ est requis.")
    // .test('fileFormat', 'Type de fichier non pris en charge.', (value) => (value && SUPPORTED_FORMATS.includes(value.type)))
    // .test('fileSize', 'Veuillez vérifier la dimension du fichier.', async (value) => { 
    //   if(!value) return false;
    //   const img = new Image();
    //   img.src = URL.createObjectURL(value);
    //   return await new Promise(resolve => {
    //     img.decode().then(() => {
    //       URL.revokeObjectURL(img.src);
    //       return resolve(img.width >= 1140 && img.height >= 470);
    //     });
    //   });
    // }),
    ,
    changepassword: Yup.string()
      .required("Ce champ est requis.")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Le mot de passe et la confirmation du mot de passe ne correspondent pas"
        ),
      }),
    // acceptTerms: Yup.bool().required(
    //   "You must accept the terms and conditions"
    // ),
  });

  const onAvatarSelectFile = (e) => {
    const file = e.target.files[0];
    let img = new Image()
    img.src = window.URL.createObjectURL(file)
    
    img.onload = () => {
      console.log(img.width, img.height)
      if(img.width < 400 || img.height < 400){
        ImageSizeWarning(400, 400);
        avatarInput.current.value = null;
      }else{
        console.log(img.width, img.height)
        setUpImg(img.src)
        handleOpenAvatarModal()
      }
    }
  };

  const saveAvatar = () =>{
    handleCloseAvatarModal()
    formik.setFieldValue("avatar", cropToImage)
  }
  const cancelAvatarModal = () => {
    handleCloseAvatarModal();
    avatarInput.current.value = null;
    formik.setFieldValue("avatar", "");
  }

  const onPhotoSelectFile = (e) => {
    const file = e.target.files[0];
    let img = new Image()
    img.src = window.URL.createObjectURL(file)
    
    img.onload = () => {
      console.log(img.width, img.height)
      if(img.width < 1140 || img.height < 470){
        ImageSizeWarning(1140, 470);
        photoInput.current.value = null;
      }else{
        console.log(img.width, img.height)
        setUpImg(img.src)
        handleOpenPhotoModal()
      }
    }
  };

  const savePhoto = () =>{
    handleClosePhotoModal()
    formik.setFieldValue("photo", cropToImage)
  }
  const cancelPhotoModal = () => {
    handleClosePhotoModal();
    photoInput.current.value = null;
    formik.setFieldValue("photo", "");
  }
  const onLoad = useCallback((img)=>{
    // console.log("width = ", img.width)
    // console.log("height = ", img.height)
    imgRef.current = img;
  });

  async function cropAvatar(crop) {
    if (imgRef) {
      const img = imgRef.current;
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;
      const scale = Math.max(scaleX, scaleY);
      crop.width = 400 / scale;
      crop.height = 400 / scale;
      const croppedImage = await getCroppedImage(img,crop, 400, 400);
      
      setCropToImage(croppedImage);
    }
  }
  async function cropPhoto(crop) {
    if (imgRef) {
      const img = imgRef.current;
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;
      const scale = Math.max(scaleX, scaleY);
      crop.width = 1140 / scale;
      crop.height = 470 / scale;
      const croppedImage = await getCroppedImage(img,crop, 1140, 470);
      
      setCropToImage(croppedImage);
    }
  }
  
  function getCroppedImage(sourceImage, cropConfig, Width, Height) {
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = Width;
    canvas.height = Height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      Width,
      Height,
      0,
      0,
      Width,
      Height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    return base64Image;
  }

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };
  
  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setErrors, setSubmitting}) => {
      setSubmitting(true);
      enableLoading();
      console.log(values);
      let formData = new FormData();
      for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
          const value = values[key];
          formData.append(key, value)
        }
      }
      console.log(formData);
      register(formData)
        .then(({ data: { accessToken } }) => {
          props.history.push('/auth/login');
          disableLoading();
          setSubmitting(false);
        })
        .catch((err) => {
          setSubmitting(false);
          setErrors(err.response.data.errors);
          setStatus(
            intl.formatMessage({
              id: "AUTH.VALIDATION.INVALID_LOGIN",
            })
          );
          disableLoading();
        });
    },
  });

  return (
    <>
      <HeaderMobile />
      <div className="d-flex flex-column flex-root">
        {/*begin::Page*/}
        <div className="d-flex flex-row flex-column-fluid page">
          {/* <Aside /> */}
          {/*begin::Wrapper*/}
          <div className="d-flex flex-column bg-dark flex-row-fluid" id="kt_wrapper">
            <Header />
            {/*begin::Content*/}
            <div
              id="kt_content"
              className={`content ${''} d-flex flex-column flex-column-fluid`}
            >
              {/* <SubHeader /> */}
              {/*begin::Entry*/}

              <div className="d-flex flex-column-fluid">
                {/*begin::Container*/}
                <div className={'container'}>
                  <div className="register-content mx-auto px-15 py-10 mb-15 text-white-50">
                    <form
                      id="kt_login_signin_form"
                      onSubmit={formik.handleSubmit}
                    >
                      <p >Bienvenu (e) dans le répertoire Congolais des affaires. Vous êtes sur le point d'entrer dans
                      le réseau de professionnels, d'opérateurs économiques et de créateurs les plus authentiques opérant sur le sol congolais et ailleurs.
                      Veuillez, s'il vous plaît, entrer vos informations les plus précises. Décrivez au mieux votre expérience dans votre domaine d'expertise ainsi que vos qualités professionnelles. Nous vous recommandons d'inclure aussi vos qualités personnelles.
                        Apres validation, vos informations entrées dans ce site seront publiées, vues et partager par des tierces personnes visitant ou recherchant d’expertises comme le vôtre. </p>

                      <div className="row mt-15">
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Noms :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: username */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "username"
                              )}`}
                              name="username"
                              {...formik.getFieldProps("username")}
                            />
                            {formik.touched.username && formik.errors.username ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.username}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: username */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Profession :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: profession */}
                          <div className="form-group fv-plugins-icon-container" style={{ color: 'black', borderRadius: 0 }}>
                            {/* <Select
                              placeholder="sélectionner Profession"
                              className={`${getInputClasses(
                                "profession"
                              )}`}
                              {...formik.getFieldProps("profession")}
                              onChange={selectedOption => {
                                formik.values.profession = selectedOption;
                                setUpdate(update + 1);
                              }}
                              isSearchable={true}
                              options={professionList}
                              name="profession"
                              style={{borderRadius:'0px !important'}}
                            /> */}
                            <Autocomplete
                              id="free-solo-demo"
                              freeSolo
                              // multiple
                              options={professionList.map((option) => option.value)}
                              className={` ${getInputClasses(
                                "profession"
                              )}`}
                              onChange={(event, values) => {
                                formik.values.profession = values;
                                setUpdate(update + 1);
                                console.log(formik.values.profession);
                              }}
                              name="profession"
                              renderInput={(params) => (
                                <TextField {...params}
                                  variant="outlined"
                                  onChange={(event) => {
                                    console.log(event.target.value);
                                    formik.values.profession = event.target.value;
                                  }}
                                  style={{ borderRadius: '0px !important', backgroundColor: 'rgb(232, 240, 254)' }} />
                              )}
                            />
                            {formik.touched.profession && formik.errors.profession ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.profession}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: profession */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Domaine d'expertise :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: field */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "field"
                              )}`}
                              name="name"
                              {...formik.getFieldProps("field")}
                            />
                            {formik.touched.field && formik.errors.field ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.field}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: name */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Industrie :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: name */}
                          <div className="form-group fv-plugins-icon-container" style={{ color: 'black' }}>
                            {/* <Select
                              placeholder="sélectionner Industrie"
                              className={`${getInputClasses(
                                "industry"
                              )}`}
                              {...formik.getFieldProps("industry")}
                              onChange={selectedOption => {
                                formik.values.industry = selectedOption;
                                setUpdate(update + 1);
                              }}
                              isSearchable={true}
                              options={domainList}
                              name="industry"
                            /> */}
                            <Autocomplete
                              id="free-solo-demo"
                              freeSolo
                              options={domainList.map((option) => option.value)}
                              className={` ${getInputClasses(
                                "industry"
                              )}`}
                              onChange={(event, values) => {
                                formik.values.industry = values;
                                setUpdate(update + 1);
                              }}
                              name="industry"
                              renderInput={(params) => (
                                <TextField {...params}
                                  variant="outlined"
                                  onChange={(event) => {
                                    formik.values.industry = event.target.value;
                                  }}
                                  style={{ borderRadius: '0px !important', backgroundColor: 'rgb(232, 240, 254)' }} />
                              )}
                            />
                            {formik.touched.industry && formik.errors.industry ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.industry}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: industry */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Pays :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: country */}
                          <div className="form-group fv-plugins-icon-container" style={{ color: 'black' }}>
                            <Autocomplete
                              id="free-solo-demo"
                              freeSolo
                              options={countryList.map((option) => option.value)}
                              className={` ${getInputClasses(
                                "country"
                              )}`}
                              onChange={(event, values) => {
                                formik.values.country = values;
                                setUpdate(update + 1);
                              }}
                              name="country"
                              renderInput={(params) => (
                                <TextField {...params}
                                  variant="outlined"
                                  onChange={(event) => {
                                    formik.values.country = event.target.value;
                                  }}
                                  style={{ borderRadius: '0px !important', backgroundColor: 'rgb(232, 240, 254)' }} />
                              )}
                            />
                            {formik.touched.country && formik.errors.country ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.country}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: country */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Etat :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: state */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "state"
                              )}`}
                              name="state"
                              {...formik.getFieldProps("state")}
                            />
                            {formik.touched.state && formik.errors.state ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.state}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: state */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Ville :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: city */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "city"
                              )}`}
                              name="city"
                              {...formik.getFieldProps("city")}
                            />
                            {formik.touched.city && formik.errors.city ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.city}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: city */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">
                          A propos de vous :
                          <p className="mt-5">(Vous pouvez taper ou
                          copier et coller votre
                            texte dans ce champ)</p>
                        </div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: note */}
                          <div className="form-group fv-plugins-icon-container">
                            <textarea
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "note"
                              )}`}
                              name="note"
                              rows="10"
                              {...formik.getFieldProps("note")}
                            />
                            {formik.touched.note && formik.errors.note ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.note}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: note */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Tél. bureau :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: telephone */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "telephone"
                              )}`}
                              name="telephone"
                              {...formik.getFieldProps("telephone")}
                            />
                            {formik.touched.telephone && formik.errors.telephone ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.telephone}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: telephone */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Tél. portable :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: phone */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "phone"
                              )}`}
                              name="phone"
                              {...formik.getFieldProps("phone")}
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.phone}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: phone */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Fax :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: fax */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "fax"
                              )}`}
                              name="fax"
                              {...formik.getFieldProps("fax")}
                            />
                            {formik.touched.fax && formik.errors.fax ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.fax}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: fax */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Adresse électronique :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: email */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "email"
                              )}`}
                              name="email"
                              {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.email}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: email */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Site Web :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: website */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "website"
                              )}`}
                              name="website"
                              {...formik.getFieldProps("website")}
                            />
                            {formik.touched.website && formik.errors.website ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.website}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: website */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-0">
                          Photo identifiant :
                          <p className="m-0">
                            14.11cm * 14.11cm <br />
                            (400px * 400px)
                          </p>
                        </div>

                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: avatar */}
                            <div className="form-group fv-plugins-icon-container">
                              <div style={{ display: "flex" }}>
                              <input
                                type="file"
                                ref={avatarInput}
                                className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                  "avatar"
                                )}`}
                                name="avatar"
                                accept=".png, .jpg, .jpeg"
                                onChange={onAvatarSelectFile}
                              />
                              <button type="reset" onClick={() => { formik.setFieldValue("avatar", ""); formik.setFieldValue("photo", ""); }} style={{ width: "45px", marginLeft: "10px" }}><i className="fas fa-trash" style={{ color: "black" }}></i></button>
                              </div>
                              <Modal 
                                open={openAvatarModal}
                                onClose={cancelAvatarModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">
                                <Box sx={classes.modalBox}>
                                  <Box>
                                    <ReactCrop
                                      src={upImg}
                                      onImageLoaded={onLoad}
                                      crop={crop}
                                      locked="true"
                                      onChange={(crop) => setCrop(crop)}
                                      onComplete={(crop) => cropAvatar(crop)}
                                    />
                                    {/* <img src={upImg} alt="cropped Image"></img> */}
                                  </Box>
                                  <Box sx={classes.modalButtonGroup}>
                                    <Button variant="contained" color="secondary" onClick={saveAvatar}>Save</Button>
                                    <Button variant="contained" onClick={cancelAvatarModal}>Cancel</Button>
                                  </Box>
                                </Box>
                              </Modal>
                              {formik.touched.avatar && formik.errors.avatar ? (
                                <div className="fv-plugins-message-container">
                                  <div className="fv-help-block">{formik.errors.avatar}</div>
                                </div>
                              ) : null}
                            </div>
                              {/* <img src={cropToImage}></img> */}
                          {/* end: avatar */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-0">
                          Photo pour votre page :
                          <p className="m-0">
                            40.22cm * 16.58cm <br />
                            (1140px * 470px)
                          </p>
                        </div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: photo */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="file"
                              ref={photoInput}
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "photo"
                              )}`}
                              accept=".png, .jpg, .jpeg"
                              name="photo"
                              onChange={onPhotoSelectFile}
                              style={{ width: "342.52px" }}
                            />
                            <Modal 
                              open={openPhotoModal}
                              onClose={cancelPhotoModal}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description">
                              <Box sx={classes.modalBox}>
                                <Box>
                                  <ReactCrop
                                    src={upImg}
                                    onImageLoaded={onLoad}
                                    crop={crop}
                                    locked="true"
                                    onChange={(crop) => setCrop(crop)}
                                    onComplete={(crop) => cropPhoto(crop)}
                                  />
                                </Box>
                                <Box sx={classes.modalButtonGroup}>
                                  <Button variant="contained" color="secondary" onClick={savePhoto}>Save</Button>
                                  <Button variant="contained" onClick={cancelPhotoModal}>Cancel</Button>
                                </Box>
                              </Box>
                            </Modal>
                            {formik.touched.photo && formik.errors.photo ? (
                              <div className="fv-plugins-message-container">
        
                                  <div className="fv-help-block">{formik.errors.photo}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: photo */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Mot de passe :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: password */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="password"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "password"
                              )}`}
                              name="password"
                              {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.password}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: password */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Confirmez le mot de passe :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: changepassword */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="password"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "changepassword"
                              )}`}
                              name="changepassword"
                              {...formik.getFieldProps("changepassword")}
                            />
                            {formik.touched.changepassword && formik.errors.changepassword ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.changepassword}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: changepassword */}
                        </div>
                      </div>
                      <button
                        type="submit"
                        id="register_btn"
                        // disabled={
                        //   formik.isSubmitting ||
                        //   !formik.isValid
                        //   // !formik.values.acceptTerms
                        // }
                        className="send font-weight-bold px-9 py-4 my-3 mx-4 position-absolute"
                        style={{
                          left: "calc(50% - 90px)",
                          width: 173,
                          height: 43,
                          borderRadius: 10,
                        }}
                      >
                        {loading && <span className="ml-3 spinner spinner-white"></span>}
                      </button>
                    </form>

                  </div>
                </div>
                {/*end::Container*/}
              </div>


              {/* {layoutProps.contentExtended && ''} */}
              {/*end::Entry*/}
            </div>
            {/*end::Content*/}
            <Footer />
          </div>
          {/*end::Wrapper*/}
        </div>
        {/*end::Page*/}
      </div>
      <QuickUser />
      {/* <QuickPanel /> */}
      <ScrollTop />
      {/* <StickyToolbar /> */}
      {/*end::Main*/}
      <LayoutInit />
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(UpdateProfile));
