import dotevn from 'dotenv'

dotevn.config();

export default  {
    PORT : process.env.PORT || 5000
}