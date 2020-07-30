import React, { useState, useEffect } from 'react'
import '../static/style/components/header.css'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import * as Icon from '@ant-design/icons'
import Router from 'next/router'
import axios from 'axios'
import servicePath from '../config/apiUrl'
const Header = () => {
    const [navArray, setNavArray] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    }, [])

    const handleClick = (item) => {
        console.log(item)
        let key = item.key.substring(0, 1)
        let typename = item.key.substring(1)
        if (key == 0) {
            Router.push('/index')
        } else {
            // Router.push('/list?id=' + key+'?typename')
            Router.push({
                pathname: '/list',
                query: {
                    id: key,
                    typename: typename
                }
            })
        }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={16} lg={16} xl={9} >
                    <span className="header-logo">技术威</span>
                    <span className="header-txt">前端开发个人分享</span>
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}
                    >
                        <Menu.Item key="0">
                            <HomeOutlined />
                        首页
                    </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.Id + item.typeName}>
                                        {React.createElement(Icon[item.icon])}
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }

                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
export default Header