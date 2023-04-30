import {Link, withRouter} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-card">
      <div className="similar-company-logo-title-container">
        <img
          src={companyLogoUrl}
          className="similar-company-logo"
          alt="similar job company logo"
        />
        <div className="similar-title-rating-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-rating-container">
            <AiFillStar className="similar-star-icon" />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-description-title">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-location-package-container">
        <div className="similar-location-job-type-container">
          <MdLocationOn className="similar-location-icon" />
          <p className="similar-location">{location}</p>
          <BsFillBriefcaseFill className="similar-job-type-icon" />
          <p className="similar-employment-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default withRouter(SimilarJobCard)
