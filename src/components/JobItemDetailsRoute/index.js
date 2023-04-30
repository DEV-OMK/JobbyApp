import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobDetailsCard from '../JobDetailsCard'
import SimilarJobCard from '../SimilarJobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetailsRoute extends Component {
  state = {
    jobDetailsApiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  onSuccessApi = data => {
    const jobDetails = data.job_details
    const similarJobs = data.similar_jobs

    const updatedJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      title: jobDetails.title,
      skills: jobDetails.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      })),
      lifeAtCompany: {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      },
    }

    const updatedSimilarJobs = similarJobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    this.setState({
      jobDetails: updatedJobDetails,
      similarJobs: updatedSimilarJobs,
      jobDetailsApiStatus: apiStatusConstants.success,
    })
  }

  getJobItemDetails = async () => {
    this.setState({jobDetailsApiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok) {
      this.onSuccessApi(fetchedData)
    } else {
      this.setState({jobDetailsApiStatus: apiStatusConstants.failure})
    }
  }

  retryGetJobDetailsData = () => {
    this.getJobItemDetails()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetailsFailureView = () => (
    <div className="jobs-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="job-failure-title">Oops! Something Went Wrong</h1>
      <p className="job-failure-caption">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.retryGetJobDetailsData}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetailsSuccessView = () => {
    const {jobDetails, similarJobs} = this.state

    return (
      <>
        <JobDetailsCard jobDetails={jobDetails} />
        <h1 className="similar-jobs-title">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobs.map(eachJob => (
            <SimilarJobCard key={eachJob.id} similarJobDetails={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  renderJobItemDetailsView = () => {
    const {jobDetailsApiStatus} = this.state
    switch (jobDetailsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderJobItemDetailsFailureView()
      case apiStatusConstants.success:
        return this.renderJobItemDetailsSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-bg-container">
          <div className="job-item-details-responsive-container">
            {this.renderJobItemDetailsView()}
          </div>
        </div>
      </>
    )
  }
}

export default JobItemDetailsRoute
