import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import Button from "../common/Button";
import { apiCall } from "../utils/helpers";
import TextArea from "../common/TextArea";

type Props = {
  currentBio?: string;
  onClose: () => void;
  visible?: boolean;
  className?: string;
}

const EditBioModal = (props: Props) => {
  const [proposedBio, setProposedBio] = useState(props.currentBio || '');
  const [error, setError] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  function onSubmitButtonClick() {
    apiCall({
      endpoint: '/my-profile/bio',
      method: 'PUT',
      body: {
        bio: proposedBio
      }
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.status >= 300) {
          setError(body.error || body.exception);
        } else {
          location.reload();
        }
      });
  }

  function onCloseButtonClicked() {
    props.onClose();
  }

  useEffect(() => {
    if (proposedBio !== props.currentBio) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }, [proposedBio]);

  const componentId = 'edit-bio-modal';

  return (
    <div
      id={componentId}
      tabIndex={-1}
      className={'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center flex items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full transition-all duration-250 '+(props.visible ? 'opacity-1 z-5' : 'opacity-0 -z-50')}>

      <div className="relative m-auto p-4 w-full max-w-md max-h-full">
        <div className="relative rounded-lg shadow bg-gray-700">
          
          <div className='p-4 border-b border-gray-600 modal-header'>
            <div className="flex items-center justify-between rounded-t">
              <h3 className="text-lg font-semibold">
                Edit Bio
              </h3>
              <button type="button" onClick={onCloseButtonClicked} className="bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
                <FontAwesomeIcon icon={byPrefixAndName.fas['xmark']} />
              </button>
            </div>
          </div>

          <div className='p-4 modal-content'>
            <div className='mb-4'>
              <div className="mb-2 text-sm font-medium">Bio</div>
              <TextArea
                value={proposedBio}
                onChange={e => setProposedBio(e.target.value)}
                className='mt-5'/>
            </div>

            <div className='flex items-center mb-5'>
              <Button onClick={onSubmitButtonClick} disabled={submitButtonDisabled} className='max-w-[170px] mx-auto'>
                <FontAwesomeIcon icon={byPrefixAndName.fas['floppy-disk']} className='mr-2' />
                Save
              </Button>
            </div>

            <div className='text-center text-red-500'>{error}</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBioModal;
