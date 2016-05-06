import os
import json
from DivvyBlueprints.v2 import Blueprint
from DivvyPlugins.plugin_helpers import register_api_blueprint, unregister_api_blueprints

from DivvyPlugins.plugin_metadata import PluginMetadata
from DivvyUtils.flask_helpers import JsonResponse


class metadata(PluginMetadata):
    """
    Information about this plugin
    """
    version = '1.0'
    last_updated_date = '2016-02-26'
    author = 'Divvy Cloud Corp.'
    nickname = 'HelloWorld'
    default_language_description = 'Hello World Plugin.'
    support_email = 'support@divvycloud.com'
    support_url = 'http://support.divvycloud.com'
    main_url = 'http://www.divvycloud.com'
    category = 'HelloWorld'
    managed = False


blueprint = Blueprint('helloworld', __name__)

@blueprint.routeAuthenticated('/list', methods=['POST'])
def get_list():
    data = [
        {"Name" : "Hi", "From" : "Cow"},
        {"Name" : "Hi", "From":"Chicken"},
        {"Name" : "Hi", "From":"Rooster"},
        {"Name" : "Hi", "From":"Duck"}]


    return JsonResponse(json.dumps(data))


def load():
    register_api_blueprint(blueprint)


def unload():
    unregister_api_blueprints()
