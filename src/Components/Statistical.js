import React, { useState, useEffect } from 'react'
import { revenuebymonth, revenuebyproduct } from '../Service'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { dataRevenueByMonth, dataByProduct, dataByRate } from '../valiable'

export default function Statistical(props) {
    const [chartRevenueByMonth, setChartRevenueByMonth] = useState(dataRevenueByMonth)
    const [chartProduct, setChartProduct] = useState(dataByProduct)
    const [chartRate, setChartRate] = useState(dataByRate)

    useEffect(() => {
        if (localStorage.getItem('username') !== 'admin_duc' && localStorage.getItem('iduser') !== 1) {
            props.history.push('/')
        }

        revenuebymonth().then(res => {
            let dataRevenueByMonth = res.data
            let arrNewDate = []
            let arrDateTime = []
            let arrRevenuePro = []
            let isChartRevenueByMonth = chartRevenueByMonth
            for (let i = 1; i < 13; i++) {
                let labelTime = i + ""
                if (i < 10) labelTime = 0 + labelTime
                arrDateTime.push(labelTime);
                arrRevenuePro.push(0)
            }
            // 
            dataRevenueByMonth.map(item => {
                let index = parseInt(item.date_payment1)
                arrRevenuePro[index - 1] = item.revenue
            })
            chartRevenueByMonth.series[0].data = arrRevenuePro
            // -------------------------------------

            // 
            arrRevenuePro.forEach((item, index) => {
                arrNewDate.push(arrDateTime[index])
            })
            chartRevenueByMonth.xAxis.categories = arrNewDate
            // --------------------------------------
            setChartRevenueByMonth(isChartRevenueByMonth)
        })

        revenuebyproduct().then(res => {
            let isChartProduct = chartProduct
            let isChartRate = chartRate
            let seriesPro = isChartProduct.series[0]
            let seriesRate = isChartRate.series[0]
            res.data.map(item => {
                if (item.type_pr_id === 1) {
                    seriesPro.data[0].y = (item.revenue)
                    seriesRate.data[0].y = (item.revenue);
                }
                if (item.type_pr_id === 2) {
                    seriesPro.data[1].y = (item.revenue)
                    seriesRate.data[1].y = (item.revenue);
                }
                if (item.type_pr_id === 3) {
                    seriesPro.data[2].y = (item.revenue)
                    seriesRate.data[2].y = (item.revenue);
                }
                if (item.type_pr_id === 4) {
                    seriesPro.data[3].y = (item.revenue)
                    seriesRate.data[3].y = (item.revenue);
                }
                if (item.type_pr_id === 5) {
                    seriesPro.data[4].y = (item.revenue)
                    seriesRate.data[4].y = (item.revenue);
                }
                if (item.type_pr_id === 6) {
                    seriesPro.data[5].y = (item.revenue)
                    seriesRate.data[5].y = (item.revenue);
                }
            })
            setChartProduct(isChartProduct)
            setChartRate(isChartRate)
        })
    }, [])

    return (
        <>
            <div style={{ paddingTop: "200px" }}>
                <div className="">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartRevenueByMonth}
                        updateArgs={[true]}
                        style={{ margin: "20px" }}
                    />
                </div>
            </div>
            <div className="container-fluid">
                <div className="row" style={{ marginTop: "2em" }}>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div className="active-border-chart">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={chartProduct}
                                updateArgs={[true]}
                                style={{ margin: "20px" }}
                            />
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div className="active-border-chart">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={chartRate}
                                updateArgs={[true]}
                                style={{ margin: "20px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

