import {Link, withRouter} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-card">
      <Link to={`jobs/${id}`} className="link-item">
        <div className="company-logo-title-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div className="title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-package-container">
          <div className="location-job-type-container">
            <MdLocationOn className="location-icon" />
            <p className="location">{location}</p>
            <BsFillBriefcaseFill className="job-type-icon" />
            <p className="employment-type">{employmentType}</p>
          </div>
          <p className="package-per-annum">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="description-title">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default withRouter(JobCard)
