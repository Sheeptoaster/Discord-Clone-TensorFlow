from flask import Flask, jsonify, redirect, request
import uuid

from pymongo import ReturnDocument

from app import db
import json


class Server():
	def create_server(self):
		data = json.loads(request.data)

		server = {
			"_id": uuid.uuid4().hex,
			"server_name": data['serverName'],
			"server_img": data['server_img'],
			"owner_id": data['ownerId'],
			"users": [],
			"messages": [],
		}

		if db.servers.find_one({ "server_name": server["server_name"] }):
			return jsonify({ "error": "Server name is already in use" }), 400

		if db.servers.insert_one(server):
			db.users.update_one({
				{ '_id': server['owner_id'] },
				{ '$push': { 'servers': server["_id"] } },
			}, return_document= ReturnDocument.AFTER)
