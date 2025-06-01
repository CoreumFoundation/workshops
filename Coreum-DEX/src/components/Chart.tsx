"use client";

import React, { useEffect, useRef } from "react";
import { createChart, ColorType, AreaSeries } from "lightweight-charts";
import { usePriceData } from "../hooks/usePriceData";
import DollarPlaceholder from "../assets/coreum_fun_logo.png";
const Chart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { priceHistory, isLoading, error } = usePriceData();

  useEffect(() => {
    if (!chartContainerRef.current || priceHistory.length === 0) return;

    // Create chart instance
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#312e81" },
        textColor: "#d1d5db",
      },
      grid: {
        vertLines: { color: "rgba(70, 70, 150, 0.2)" },
        horzLines: { color: "rgba(70, 70, 150, 0.2)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.3)",
        visible: true,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
        mode: 0,
        autoScale: true,
        alignLabels: true,
        borderVisible: true,
        textColor: "#d1d5db",
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.3)",
        timeVisible: true,
      },
    });

    // Create the area series
    const areaSeries = chart.addSeries(AreaSeries);

    // Set series options
    areaSeries.applyOptions({
      lineColor: "#35F0D0",
      topColor: "rgba(53, 240, 208, 0.6)",
      bottomColor: "rgba(53, 240, 208, 0.1)",
      lineWidth: 2,
      priceLineVisible: false,
      priceFormat: {
        type: "price",
        precision: 2,
        minMove: 0.000001,
      },
      title: "Ticket/Coreum",
    });

    // Set the data
    areaSeries.setData(priceHistory);

    // Add custom price markers if we have data
    if (priceHistory.length > 0) {
      const latestPrice = priceHistory[priceHistory.length - 1].value;
      const minPrice = Math.min(
        ...priceHistory.map((d: { value: number }) => d.value)
      );
      const maxPrice = Math.max(
        ...priceHistory.map((d: { value: number }) => d.value)
      );

      areaSeries.createPriceLine({
        price: minPrice,
        color: "#35F0D0",
        lineWidth: 2,
        lineStyle: 2,
        axisLabelVisible: true,
        title: minPrice.toFixed(2),
      });

      areaSeries.createPriceLine({
        price: maxPrice,
        color: "#4ade80",
        lineWidth: 2,
        lineStyle: 2,
        axisLabelVisible: true,
        title: maxPrice.toFixed(2),
      });
    }

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [priceHistory]);

  if (error) {
    return (
      <div className="bg-indigo-900/50 rounded-lg h-full w-full flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-indigo-900/50 rounded-lg h-full w-full flex items-center justify-center">
        <p className="text-gray-300">Loading...</p>
      </div>
    );
  }

  if (priceHistory.length === 0) {
    return (
      <div className="bg-indigo-900/50 rounded-lg h-full w-full flex flex-col items-center justify-center">
        <img
          src={DollarPlaceholder.src}
          alt="Waiting for trades"
          style={{ width: 200, height: 200, marginBottom: 16 }}
        />
        <p className="text-gray-300 text-lg mt-2">
          waiting for 1st trades to happen
        </p>
      </div>
    );
  }

  return (
    <div className="bg-indigo-900/50 rounded-lg h-full w-full min-h-[300px] border border-indigo-500/30">
      <div
        ref={chartContainerRef}
        className="h-full w-full bg-indigo-900/30 rounded-lg min-h-[300px] overflow-hidden"
      />
    </div>
  );
};

export default Chart;
