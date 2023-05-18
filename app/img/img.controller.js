import express from "express";
import path from 'path'

const __dirname = path.resolve()

export const imgProducts = () => {
  express.static(path.resolve(__dirname,
    'app/static/img/img_products'))
}

export const imgTypes = () => {
  express.static(path.resolve(__dirname,
    'app/static/img/img_types'))
}