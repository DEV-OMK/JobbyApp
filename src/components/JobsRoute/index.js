import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import ProfileCard from '../ProfileCard'
import JobCard from '../JobCard'
import FilterGroup from '../FilterGroup'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobsRoute extends Component {
  state = {
    profileApiStatus: apiStatusConstants.initial,
    profileDetails: {},
    jobsApiStatus: apiStatusConstants.initial,
    jobsData: [],
    searchInput: '',
    typeOfEmployment: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)
    const fetchedData = await response.json()

    if (response.ok) {
      const profileDetails = fetchedData.profile_details
      const updatedProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }

      this.setState({
        profileApiStatus: apiStatusConstants.success,
        profileDetails: updatedProfileDetails,
      })
    } else {
      this.setState({
        profileApiStatus: apiStatusConstants.failure,
      })
    }
  }

  getJobsData = async () => {
    this.setState({
      jobsApiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput, typeOfEmployment, salaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${typeOfEmployment.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsUrl, options)
    const fetchedData = await response.json()

    if (response.ok) {
      const {jobs} = fetchedData
      const updatedJobs = jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        jobsApiStatus: apiStatusConstants.success,
        jobsData: updatedJobs,
      })
    } else {
      this.setState({
        jobsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  retryGetProfile = () => {
    this.getProfileData()
  }

  retryGetJobsData = () => {
    this.getJobsData()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getJobsData()
  }

  addEmploymentTypeFilter = type => {
    this.setState(
      prevState => ({
        typeOfEmployment: [...prevState.typeOfEmployment, type],
      }),
      this.getJobsData,
    )
  }

  removeEmploymentTypeFilter = type => {
    this.setState(prevState => {
      const updatedTypeOfEmploymentList = prevState.typeOfEmployment.filter(
        eachEmploymentType => eachEmploymentType !== type,
      )

      return {
        typeOfEmployment: updatedTypeOfEmploymentList,
      }
    }, this.getJobsData)
  }

  updateSalaryRangeFilter = salaryRange => {
    this.setState({salaryRange}, this.getJobsData)
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state

    return <ProfileCard profileDetails={profileDetails} />
  }

  renderProfileFailureView = () => (
    <button
      type="button"
      className="retry-button"
      onClick={this.retryGetProfile}
    >
      Retry
    </button>
  )

  renderJobsDataSuccessView = () => {
    const {jobsData} = this.state

    if (jobsData.length === 0) {
      return this.renderNoJobsFoundView()
    }

    return (
      <ul className="jobs-list-container">
        {jobsData.map(job => (
          <JobCard key={job.id} jobDetails={job} />
        ))}
      </ul>
    )
  }

  renderJobsDataFailureView = () => (
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
        onClick={this.retryGetJobsData}
      >
        Retry
      </button>
    </div>
  )

  renderNoJobsFoundView = () => (
    <div className="jobs-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="jobs-failure-image"
      />
      <h1 className="job-failure-title">No jobs Found</h1>
      <p className="job-failure-caption">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderSearchField = () => {
    const {searchInput} = this.state
    return (
      <div className="search-bar-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          className="search-icon-button"
          onClick={this.onClickSearchIcon}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderProfileField = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  renderJobsField = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsDataSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsDataFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-responsive-container">
            <div className="search-bar-container search-bar-sm">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="search-icon-button"
                onClick={this.onClickSearchIcon}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="profile-filters-container">
              <div className="profile-container">
                {this.renderProfileField()}
              </div>
              <div className="filters-group-container">
                <FilterGroup
                  updateSalaryRangeFilter={this.updateSalaryRangeFilter}
                  removeEmploymentTypeFilter={this.removeEmploymentTypeFilter}
                  addEmploymentTypeFilter={this.addEmploymentTypeFilter}
                />
              </div>
            </div>
            <div className="search-bar-jobs-field-container">
              <div className="search-bar-container search-bar-lg">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
                <button
                  type="button"
                  className="search-icon-button"
                  onClick={this.onClickSearchIcon}
                  data-testid="searchButton"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              <div className="jobs-field-container">
                {this.renderJobsField()}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
