import './index.css'

const ProfileCard = props => {
  const {profileDetails} = props
  const {name, profileImageUrl, shortBio} = profileDetails

  return (
    <div className="profile-card">
      <img src={profileImageUrl} className="profile-image" alt="profile" />
      <h1 className="profile-name">{name}</h1>
      <p className="profile-bio">{shortBio}</p>
    </div>
  )
}

export default ProfileCard
