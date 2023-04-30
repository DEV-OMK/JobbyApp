import {Link, withRouter} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {RiExternalLinkLine} from 'react-icons/ri'
import './index.css'

const JobDetailsCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    skills,
    lifeAtCompany,
  } = jobDetails

  const {imageUrl, description} = lifeAtCompany

  return (
    <div className="job-details-card">
      <div className="job-details-company-logo-title-container">
        <img
          src={companyLogoUrl}
          className="job-details-company-logo"
          alt="job details company logo"
        />
        <div className="job-details-title-rating-container">
          <h1 className="job-details-title">{title}</h1>
          <div className="job-details-rating-container">
            <AiFillStar className="job-details-star-icon" />
            <p className="job-details-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="job-details-location-package-container">
        <div className="job-details-location-job-type-container">
          <MdLocationOn className="job-details-location-icon" />
          <p className="job-details-location">{location}</p>
          <BsFillBriefcaseFill className="job-details-type-icon" />
          <p className="job-details-employment-type">{employmentType}</p>
        </div>
        <p className="job-details-package-per-annum">{packagePerAnnum}</p>
      </div>
      <hr />
      <div className="job-details-description-visit-container">
        <h1 className="job-details-description-title">Description</h1>
        <a
          href={companyWebsiteUrl}
          target="_new"
          className="job-details-visit-text"
        >
          Visit
          <RiExternalLinkLine className="job-details-link-icon" />
        </a>
      </div>
      <p className="job-details-description">{jobDescription}</p>
      <h1 className="job-details-description-title">Skills</h1>
      <ul className="job-details-skills-list-container">
        {skills.map(eachSkill => (
          <li key={eachSkill.name} className="job-details-skill-item">
            <img
              src={eachSkill.imageUrl}
              alt={eachSkill.name}
              className="job-details-skill-image"
            />
            <p className="job-details-skill-name">{eachSkill.name}</p>
          </li>
        ))}
      </ul>
      <p className="job-details-description-title">Life at Company</p>
      <div className="job-details-description-image-container">
        <p className="job-details-description">{description}</p>
        <img
          src={imageUrl}
          alt="life at company"
          className="job-details-life-at-company-image"
        />
      </div>
    </div>
  )
}

export default withRouter(JobDetailsCard)
