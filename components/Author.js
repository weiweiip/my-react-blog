import { Avatar, Divider } from 'antd'
import { QqOutlined, GithubOutlined, WechatOutlined } from '@ant-design/icons'
import '../static/style/components/Author.css'
const Author = () => {
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={100} src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1596824697,3701136379&fm=26&gp=0.jpg"></Avatar>
        <div className="author-introduction">
          前端技术分享
            <Divider>
            社交账号
            </Divider>
          <Avatar size={28} icon={<GithubOutlined />} className="account" />
          <Avatar size={28} icon={<QqOutlined />} className="account" />
          <Avatar size={28} icon={<WechatOutlined />} className="account" />
        </div>
      </div>
    </div>
  )
}

export default Author