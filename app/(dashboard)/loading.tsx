export default function DashboardLoading() {
  return (
    <div className="dashboard-header">
      <div>
        <h1 className="page-title skeleton" style={{ width: '100px' }} />
        <p className="page-subtitle skeleton" style={{ width: '150px' }} />
      </div>
      <div className="user-card skeleton" />
    </div>
  )
}