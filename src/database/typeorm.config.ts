import { DataSource } from 'typeorm';
import 'dotenv/config';
import { configValue } from '../config/database';

export default new DataSource(configValue);
