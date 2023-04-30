import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const renderEmploymentType = () => {
    const {addEmploymentTypeFilter, removeEmploymentTypeFilter} = props
    const onChangeEmploymentFilterInput = event => {
      if (event.target.checked) {
        addEmploymentTypeFilter(event.target.value)
      } else {
        removeEmploymentTypeFilter(event.target.value)
      }
    }

    return (
      <>
        <hr />
        <h1 className="filter-title">Type of Employment</h1>
        <ul className="filter-list-container">
          {employmentTypesList.map(eachType => (
            <li key={eachType.employmentTypeId} className="filter-list-item">
              <input
                type="checkbox"
                id={eachType.employmentTypeId}
                value={eachType.employmentTypeId}
                className="filter-input"
                name="employmentType"
                onChange={onChangeEmploymentFilterInput}
              />
              <label
                htmlFor={eachType.employmentTypeId}
                className="filter-label"
              >
                {eachType.label}
              </label>
            </li>
          ))}
        </ul>
      </>
    )
  }

  const renderSalaryRange = () => {
    const {updateSalaryRangeFilter} = props
    const onChangeSalaryFilterInput = event => {
      updateSalaryRangeFilter(event.target.value)
    }

    return (
      <>
        <hr />
        <h1 className="filter-title">Salary Range</h1>
        <ul className="filter-list-container">
          {salaryRangesList.map(eachRange => (
            <li key={eachRange.salaryRangeId} className="filter-list-item">
              <input
                type="radio"
                id={eachRange.salaryRangeId}
                value={eachRange.salaryRangeId}
                className="filter-input"
                name="salaryRange"
                onChange={onChangeSalaryFilterInput}
              />
              <label htmlFor={eachRange.salaryRangeId} className="filter-label">
                {eachRange.label}
              </label>
            </li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <div className="filter-group-container">
      {renderEmploymentType()}
      {renderSalaryRange()}
    </div>
  )
}

export default FilterGroup
