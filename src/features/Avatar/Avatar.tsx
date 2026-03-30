import './Avatar.css';

const Avatar = ({ name }: { name: string }) => {
  const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(name)}`;

  return (
    <img
      src={avatarUrl}
      alt={`${name} profile`}
      className="avatar-profile-image"
      // Good practice: provide a fallback if the image fails to load
      onError={(e) => {
        (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/initials/svg?seed=fallback';
      }}
    />
  );
};

export default Avatar;
