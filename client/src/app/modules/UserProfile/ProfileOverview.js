import React, { useEffect, useState, useRef, useCallback} from "react";
import { Button, makeStyles, Typography, Modal, Box} from "@material-ui/core";
import { toImageUrl } from "../../../_metronic/_helpers";
import {getUserByToken, getUserByName, update} from '../Auth/_redux/authCrud';
import {useParams, useLocation, Link} from 'react-router-dom';
import * as Yup from "yup";
import { useFormik} from "formik";
import swal from 'sweetalert2';
import ReactCrop from 'react-image-crop';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as auth from "../Auth/_redux/authRedux";

const useStyles = makeStyles({
  modalBox:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },
  myButton:{
    width: "170px",
    borderRadius: "0px !important"
  },
  myFont:{
    color:"#b6ceff"
  }
});


function ProfileOverview(props) {
  
  const [userData, setUserData] = useState([]);
  const [editPage, setEditPage] = useState(false);
  const [note, setNote] = useState('');
  const {username} = useParams();
  const classes = useStyles();
  const { intl } = props;
  const avatarInput = useRef(null);
  const photoInput = useRef(null);
  const imgRef = useRef(null);
  const [upImg, setUpImg] = useState();
  const [crop, setCrop] = useState(null);
  const [cropToAvatar, setCropToAvatar] = useState(null);
  const [cropToPhoto, setCropToPhoto] = useState(null);
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const [changedPhoto, setChangedPhoto] = useState(false);

  const handleOpenAvatarModal = () => {setOpenAvatarModal(true);setCrop({width: 400, height: 400});}
  const handleCloseAvatarModal = () => setOpenAvatarModal(false);
  const handleOpenPhotoModal = () => {setOpenPhotoModal(true);setCrop({width: 1140, height: 470});}
  const handleClosePhotoModal = () => setOpenPhotoModal(false);

  const onLoad = useCallback((img)=>{
    imgRef.current = img;
  });
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
  async function cropAvatar(crop) {
    if (imgRef !== null) {
        const img = imgRef.current;
        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;
        const scale = Math.max(scaleX, scaleY);
        crop.width = 400 / scale;
        crop.height = 400 / scale;
        const croppedImage = await getCroppedImage(img,crop, 400, 400);
        
        setCropToAvatar(croppedImage);
    }
  }
  async function cropPhoto(crop) {
    if (imgRef !== null) {
        setChangedPhoto(true)
        
        const img = imgRef.current;
        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;
        const scale = Math.max(scaleX, scaleY);
        crop.width = 1140 / scale;
        crop.height = 470 / scale;
        const croppedImage = await getCroppedImage(img,crop, 1140, 470);
        
        setCropToPhoto(croppedImage);
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
    formik.setFieldValue("avatar", cropToAvatar)
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
    formik.setFieldValue("photo", cropToPhoto)
  }
  const cancelPhotoModal = () => {
    handleClosePhotoModal();
    photoInput.current.value = null;
    formik.setFieldValue("photo", "");
  }
  const getUser = async () => {
    console.log(username)
    if(!username){
      try{
        const {data} = await getUserByToken();
        setUserData(data);
        setNote(data.note);
      }catch(error){
        console.log(error)
      }
    }else{
      try{
        const {data} = await getUserByName(username);
        setUserData(data);
        setNote(data.note);
      }catch(error){
        console.log(error)
      }
    }
  }

  const EditionSchema = Yup.object().shape({
    name:Yup.string().required("name required"),
    profession:Yup.string().required("profession required"),
    note:Yup.string().required("note required"),
    field:Yup.string().required("field required"),
    industry:Yup.string().required("industry required"),
    website:Yup.string().required("website required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues : {
      name: userData.username ? userData.username : '',
      email:userData.email ? userData.email : '',
      profession: userData.profession ? userData.profession : '',
      note: userData.note ? userData.note : '',
      field: userData.field ? userData.field : '',
      industry: userData.industry ? userData.industry : '',
      website: userData.website ? userData.website : '',
      avatar: '',
      photo: '',
    },
    validationSchema: EditionSchema,
    onSubmit: (values, {setStatus}) => {
      console.log(values);
      let formData = new FormData();
      for (const key in values) {
        const value = values[key];
        formData.append(key, value)
      }
      update(formData)
        .then(({ data: { user } }) => {
          props.setUser(user);
          props.history.go(0);
        })
        .catch((err) => {
          setStatus(
            intl.formatMessage({
              id: "AUTH.VALIDATION.INVALID_LOGIN",
            })
          );
        });
    },
  });
  useEffect(()=>{
    getUser();
  }, []);
  return (
    <div className="row">
        {
          editPage === false || changedPhoto === false
          ? 
            <img src={toImageUrl(encodeURIComponent(userData.photo))} className="w-100" />
          :
            <img src={cropToPhoto}/>
        }
        <form id="update_profile" onSubmit={formik.handleSubmit}>
          <div>            
            <Typography className="text-white my-5" gutterBottom variant="h5" component="h2">
              {editPage === false ? 
                  userData.username : 
                  <input
                    name="name"
                    {...formik.getFieldProps("name")} 
                  />
              }
            </Typography>
            <Typography className="text-white-50 mb-5" gutterBottom variant="subtitle1">
              {editPage === false ? 
                  userData.profession :
                  <input 
                    type="text"
                    name="profession"
                    {...formik.getFieldProps("profession")} 
                  />
              }
            </Typography>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-8">
                <Typography className="text-white-50" variant="body2" color="textSecondary" component="div">
                { editPage === false ? 
                    note.split("\n").map((i, key)=>{
                      return <p key={key}>{i}</p>
                    }) :
                    <textarea
                      className={`form-control form-control-solid h-auto px-6`}
                      name="note"
                      rows="10"
                      name="note"
                      {...formik.getFieldProps("note")} 
                    />
                }
                </Typography>
                <div className="mt-10 row d-flex align-items-center flex-wrap">
                  <div className="col-4">
                    <Typography className="text-white-50" gutterBottom variant="subtitle1">
                      SECTEUR
                    </Typography>
                    <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                      {editPage === false ? userData.field :
                        <input 
                          name="field"
                          {...formik.getFieldProps("field")} 
                        />
                      }
                    </Typography>
                  </div>
                  <div className="col-4">
                    <Typography className="text-white-50" gutterBottom variant="subtitle1">
                      SPECIALITE
                    </Typography>
                    <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                      {editPage === false ? userData.industry :
                      <input 
                        name="industry"
                        {...formik.getFieldProps("industry")} 
                      />}
                    </Typography>
                  </div>
                  <div className="col-4">
                    <Typography className="text-white-50" gutterBottom variant="subtitle1">
                      PORTFOLIO
                    </Typography>
                    <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                      {editPage === false ?
                        <Link className="text-white-50" to={{pathname: `http://${userData.website}`}} target="_blank">{userData.website}</Link>
                        :
                        <input 
                          name="website"
                          {...formik.getFieldProps("website")} 
                        />
                      }                    
                    </Typography>
                  </div>
                </div>
                {editPage &&  <div className="my-10 row d-flex">
                  <div id="btn_avatar" className="col-4">
                      <input 
                        type="file"
                        id="avatar_input"
                        ref={avatarInput}
                        name="avatar"
                        accept=".png, .jpg, .jpeg"
                        onChange={onAvatarSelectFile}
                        style={{display: 'none'}}
                        />
                      <label htmlFor="avatar_input" className="mb-0">
                        <Button type="button" className={classes.myButton} component="span" variant="contained" style={{backgroundColor: "#073DC0"}}>
                          Photo de profil
                        </Button>
                      </label>
                      <Modal 
                        open={openAvatarModal}
                        onClose={cancelAvatarModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box className={classes.modalBox}>
                          <Box>
                            <ReactCrop
                              src={upImg}
                              onImageLoaded={onLoad}
                              crop={crop}
                              locked="true"
                              onChange={(crop) => setCrop(crop)}
                              onComplete={(crop) => cropAvatar(crop)}
                            />
                          </Box>
                          <Box className="d-flex justify-content-between">
                            <Button variant="contained" color="secondary" onClick={saveAvatar}>Save</Button>
                            <Button variant="contained" onClick={cancelAvatarModal}>Cancel</Button>
                          </Box>
                        </Box>
                      </Modal>
                    </div>
                  <div id="btn_photo" className="col-4">
                        <input
                          type="file"
                          id="photo_input"
                          ref={photoInput}
                          accept=".png, .jpg, .jpeg"
                          name="photo"
                          onChange={onPhotoSelectFile}
                          style={{ width: "342.52px", display:"none" }}
                        />
                        <label htmlFor="photo_input" className="mb-0">
                          <Button type="button" className={classes.myButton} component="span" variant="contained" style={{backgroundColor: "#073DC0"}}>
                            Photo de page
                          </Button>
                        </label>
                        <Modal 
                          open={openPhotoModal}
                          onClose={cancelPhotoModal}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description">
                          <Box className={classes.modalBox}>
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
                            <Box className="d-flex justify-content-between">
                              <Button variant="contained" color="secondary" onClick={savePhoto}>Save</Button>
                              <Button variant="contained" onClick={cancelPhotoModal}>Cancel</Button>
                            </Box>
                          </Box>
                        </Modal>
                      </div>
                  <div id="btn_save" className="col-4">
                    <Button
                      id="btn_submit"
                      type="submit" 
                      className={classes.myButton} variant="contained" style={{backgroundColor: "#073DC0"}}>
                      Sauvegarder
                    </Button>
                    </div>
                </div>}
              </div>
              <div className="col-12 col-sm-12 col-md-4">
                <div className="row pl-0 pl-md-20">
                  <div id="right_text_panel" className="col-6 col-sm-8 col-md-12 mt-sm-20 mt-20 mt-md-0 d-flex justify-content-end">
                    <div>
                    <Typography className={classes.myFont} gutterBottom variant="subtitle1">
                      Coordonnées
                    </Typography>
                    <Typography className="text-white-50" gutterBottom variant="body2" color="textSecondary" component="p">
                      Tél. portable : <b className={classes.myFont}>{userData.phone}</b>
                    </Typography>
                    {userData.telephone !=="" && <Typography className="text-white-50" gutterBottom variant="body2" color="textSecondary" component="p">
                      Tél. bureau : <b className={classes.myFont}>{userData.telephone}</b>
                    </Typography>}
                    <Typography className="text-white-50" gutterBottom variant="body2" color="textSecondary" component="p">
                      E-mail : 
                      <Link
                        to='#'
                        onClick={(e) => {
                            window.location = `mailto:${userData.email}`;
                            e.preventDefault();
                        }}
                      >
                        <b className={classes.myFont}>{userData.email}</b>
                    </Link>
                    </Typography>
                    <Typography className="text-white-50" gutterBottom variant="body2" color="textSecondary" component="p">
                      État : <b className={classes.myFont}>{userData.state}</b>
                    </Typography>
                    </div>
                  </div>
                  <div id="right_btn_panel" className="col-6 col-sm-4 col-md-12 mt-15 text-right">
                    <div className="col-12 mb-5">
                      <Button
                      type="button"
                      className={classes.myButton} variant="contained" style={{backgroundColor: "#0766C0"}}>
                        Carte de visite
                      </Button>
                    </div>
                    <div className="col-12 mb-5">
                      <Button 
                      type="button"
                      className={classes.myButton} variant="contained" style={{backgroundColor: "#0758C0"}}>
                        Imprimer le profil
                      </Button>
                    </div>
                    <div className="col-12 mb-5">
                      <Button
                      type="button"
                      className={classes.myButton} variant="contained" style={{backgroundColor: "#073DC0"}}>
                        Envoyer le profil
                      </Button>
                    </div>
                    {!username && <div className="col-12 mb-5">
                      <Button
                      type="button"
                      onClick={()=>{
                        setEditPage(true)
                      }}className={classes.myButton} variant="contained" style={{backgroundColor: "#073DC0"}}>
                        Modifier votre profil
                      </Button>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
    </div>
  );
}
export default injectIntl(connect(null, auth.actions)(ProfileOverview));