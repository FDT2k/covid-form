import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'

import useForm from 'hooks/useForm'

import {generate_key_pair} from 'Redux/Keys/actions'
import ReactLoading from 'react-loading';
import * as FileSaver from 'file-saver';

import FloatingInput from 'components/Layout/Form/FloatingInput'

export default props => {

    const initialValues = {email:"",name:"",passphrase:""}
    const [currentPubKey,setCurrentPubKey] = useState(null)
    const [error,setError] = useState()
    const [saved,setSaved] = useState(false);

    /*const handleValidation =  (field,value)=> {
      if (field === 'email')
        return  !isEmpty(value) && isEmail(value)

      return !isEmpty(value)
    }*/

    const handleFormSubmit = (values,validation)=>{
        /*post(fields).fork(
          _=>setError('woupsy'),
          _=>setSent('message success')
        )*/
        handleClick();
    }

    const {fields,handleInput,handleSubmit} = useForm(initialValues,handleFormSubmit,undefined,'name')
    const generating =  useSelector(state=> state.pgp.status !=='idle')
    const dispatch = useDispatch();
    const handleClick = _=> {
      dispatch(generate_key_pair([{ name: fields.name, email: fields.email }],fields.passphrase)).then(
        res => {
          setCurrentPubKey(res.payload)
        }
      ).catch(err=>{
        console.error(err)
        setError(err.toString())
      })
    }

    const exportKey = _=> {
      const data = new Blob([currentPubKey.privateKeyArmored,currentPubKey.publicKeyArmored,currentPubKey.revocationCertificate], {type: 'text'});
      FileSaver.saveAs(data, 'private.key');
      localStorage.setItem('key',[currentPubKey.privateKeyArmored,currentPubKey.publicKeyArmored,currentPubKey.revocationCertificate])
    }


    return (
      <>
          <h3>First, Let's make a key pair </h3>

        {generating &&
          <div>
            <h4>Generating Key Pair</h4>

            <ReactLoading type="cylon" color="white" height={50} width={100} />
            </div>
        }

        {currentPubKey !==  null &&
          <article>
            <h4>Key pair generated</h4>
            <p>Click on the button below to create a backup of your keys. Keep them somewhere safe and secure. Like an external drive or just print the file and keep it in a safe<br/>
              You won't be able to do it after this step</p>
            <button onClick={exportKey}>save them</button>
          </article>
        }

        {error&& <h4>{error}</h4>}

        {currentPubKey == null && !generating && <>

          <article>
          <p>This will generate a numeric identity, which can be trusted or not by other. This is a set of two keys; one public (for people to encrypt messages for you)
            and one private (which is for decryption and must NEVER BE shared) <br/>

          Be careful to save it, because if it's lost, it's for good. There is absolutely no way to recover or decipher the data without the private key in a decent human time (unless you have a quantum computer)</p>
        </article>

        <article>
          <form onSubmit={handleSubmit}>
            <FloatingInput
              placeholder="Enter your Full Name"
              id="name"
              name="name"
              type="text"
              value={fields.name}
              onChange={handleInput}
              />

            <FloatingInput
              placeholder="Enter your e-mail address"
              id="email"
              name="email"
              type="text"
              value={fields.email}
              onChange={handleInput}
              />

            <FloatingInput
              type="password"
              name="passphrase"
              value={fields.passphrase}
              onChange={handleInput}
              placeholder="Choose a very strong passphrase"/>

            <FloatingInput
              type="password"
              name="passphrase_confirm"
              value={fields.passphrase_confirm}
              onChange={handleInput}
              placeholder="Confirm your passphrase"/>

            <button>Next </button>
          </form>
        </article>
        </>
        }
      </>
    )
}
