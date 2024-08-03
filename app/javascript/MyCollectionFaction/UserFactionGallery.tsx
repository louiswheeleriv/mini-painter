import React, { useState } from "react";
import { Faction, UserFaction, UserImage, UserFactionImageAssociation } from "../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-902717d512/icons';
import { Carousel } from "flowbite-react";
import Button from "../common/Button";
import EditUserFactionGallery from "./EditUserFactionGallery";

type Props = {
  faction: Faction;
  userFaction: UserFaction;
  userImages: UserImage[];
  userFactionImageAssociations: UserFactionImageAssociation[];
}

const UserFactionGallery = (props: Props) => {
  const [mode, setMode] = useState<string>('view');
  const [images, setImages] = useState<UserImage[]>(
    props.userFactionImageAssociations.map((assoc) => (
      props.userImages.find((img) => img.id === assoc.user_image_id) ||
        { id: 0, user_id: 0, url: 'URL_BROKEN' }
    ))
  );

  const componentId = 'user-faction-gallery';

  return (
    <div id={componentId}>
      {mode === 'view' &&
        <>
          <div className='text-end my-3'>
            <Button
              onClick={() => setMode('edit')}
              className='px-3 mx-auto'>
              <FontAwesomeIcon icon={byPrefixAndName.fas['camera']} className='mr-2' />
              Edit Images
            </Button>
          </div>
          {images.length === 0 &&
            <div className='text-center'>
              No images
            </div>
          }
          {images.length > 0 &&
            <Carousel slide={false} className='h-[400px]'>
              {images.map((img) => (
                <img
                  key={img.id}
                  src={img.url}
                  className='object-contain max-w-[75%] max-h-[100%]' />
              ))}
            </Carousel>
          }
        </>
      }
      {mode === 'edit' &&
        <EditUserFactionGallery
          faction={props.faction}
          userFaction={props.userFaction}
          userImages={props.userImages}
          userFactionImageAssociations={props.userFactionImageAssociations}
          onCancel={() => setMode('view')} />
      }
    </div>
  );
};

export default UserFactionGallery;
