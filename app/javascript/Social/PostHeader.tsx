import React from "react";
import ProfilePicture from "../common/ProfilePicture";
import { friendlyDateTimeString } from "../utils/helpers";
import DropdownButton from "../common/DropdownButton";
import DropdownButtonItem from "../common/DropdownButtonItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-902717d512/icons";

type Props = {
  userId: number;
  userDisplayName: string;
  currentUserId?: number;
  userProfilePictureUrl?: string;
  timestamp?: string;
  onDelete?: () => void;
  isActionsDropdownOpen?: boolean;
  onToggleActionsDropdown?: () => void;
  className?: string;
};

const PostHeader = (props: Props) => {
  return (
    <div className='flex mb-2'>
      <ProfilePicture
        width='40px'
        imageUrl={props.userProfilePictureUrl}
        onClick={() => window.location.assign('/users/'+props.userId)}
        className='flex-none cursor-pointer' />
      <div className='flex-1 text-left ml-2'>
        <b
          onClick={() => window.location.assign('/users/'+props.userId)}
          className='cursor-pointer'>
            {props.userDisplayName}
        </b>
        {props.timestamp &&
          <div className='text-xs text-gray-300'>{friendlyDateTimeString(props.timestamp)}</div>
        }
      </div>
      {props.userId === props.currentUserId &&
        <div className='flex-none'>
          <DropdownButton
            colorSet='transparentLightText'
            isOpen={props.isActionsDropdownOpen}
            onToggle={props.onToggleActionsDropdown}>
              <DropdownButtonItem
                isFirst={true}
                isLast={true}
                onClick={props.onDelete}
                className='text-red-500 hover:text-red-700'>
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fas['trash']}
                    className='mr-2' />
                  Delete
              </DropdownButtonItem>
          </DropdownButton>
        </div>
      }
    </div>
  );
};

export default PostHeader;
