// Components
import DashboardLayout from '@app/dashboard/components/Layout'

const Dashboard = props => (
  <DashboardLayout {...props} />
)

Dashboard.getInitialProps = ({ req }) => ({
  params: req.params
})

export default Dashboard
