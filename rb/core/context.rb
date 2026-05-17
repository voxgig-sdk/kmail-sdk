# Kmail SDK context

require_relative '../utility/struct/voxgig_struct'
require_relative 'control'
require_relative 'operation'
require_relative 'spec'
require_relative 'result'
require_relative 'response'
require_relative 'error'
require_relative 'helpers'

class KmailContext
  attr_accessor :id, :out, :client, :utility, :ctrl, :meta, :config,
                :entopts, :options, :entity, :shared, :opmap,
                :data, :reqdata, :match, :reqmatch, :point,
                :spec, :result, :response, :op

  def initialize(ctxmap = {}, basectx = nil)
    ctxmap ||= {}
    @id = "C#{rand(10000000..99999999)}"
    @out = {}

    @client = KmailHelpers.get_ctx_prop(ctxmap, "client") || basectx&.client
    @utility = KmailHelpers.get_ctx_prop(ctxmap, "utility") || basectx&.utility

    @ctrl = KmailControl.new
    ctrl_raw = KmailHelpers.get_ctx_prop(ctxmap, "ctrl")
    if ctrl_raw.is_a?(Hash)
      @ctrl.throw_err = ctrl_raw["throw"] if ctrl_raw.key?("throw")
      @ctrl.explain = ctrl_raw["explain"] if ctrl_raw["explain"].is_a?(Hash)
    elsif basectx&.ctrl
      @ctrl = basectx.ctrl
    end

    m = KmailHelpers.get_ctx_prop(ctxmap, "meta")
    @meta = m.is_a?(Hash) ? m : (basectx&.meta || {})

    cfg = KmailHelpers.get_ctx_prop(ctxmap, "config")
    @config = cfg.is_a?(Hash) ? cfg : basectx&.config

    eo = KmailHelpers.get_ctx_prop(ctxmap, "entopts")
    @entopts = eo.is_a?(Hash) ? eo : basectx&.entopts

    o = KmailHelpers.get_ctx_prop(ctxmap, "options")
    @options = o.is_a?(Hash) ? o : basectx&.options

    e = KmailHelpers.get_ctx_prop(ctxmap, "entity")
    @entity = e || basectx&.entity

    s = KmailHelpers.get_ctx_prop(ctxmap, "shared")
    @shared = s.is_a?(Hash) ? s : basectx&.shared

    om = KmailHelpers.get_ctx_prop(ctxmap, "opmap")
    @opmap = om.is_a?(Hash) ? om : (basectx&.opmap || {})

    @data = KmailHelpers.to_map(KmailHelpers.get_ctx_prop(ctxmap, "data")) || {}
    @reqdata = KmailHelpers.to_map(KmailHelpers.get_ctx_prop(ctxmap, "reqdata")) || {}
    @match = KmailHelpers.to_map(KmailHelpers.get_ctx_prop(ctxmap, "match")) || {}
    @reqmatch = KmailHelpers.to_map(KmailHelpers.get_ctx_prop(ctxmap, "reqmatch")) || {}

    pt = KmailHelpers.get_ctx_prop(ctxmap, "point")
    @point = pt.is_a?(Hash) ? pt : basectx&.point

    sp = KmailHelpers.get_ctx_prop(ctxmap, "spec")
    @spec = sp.is_a?(KmailSpec) ? sp : basectx&.spec

    r = KmailHelpers.get_ctx_prop(ctxmap, "result")
    @result = r.is_a?(KmailResult) ? r : basectx&.result

    rp = KmailHelpers.get_ctx_prop(ctxmap, "response")
    @response = rp.is_a?(KmailResponse) ? rp : basectx&.response

    opname = KmailHelpers.get_ctx_prop(ctxmap, "opname") || ""
    @op = resolve_op(opname)
  end

  def resolve_op(opname)
    # Cache key is `<entity>:<opname>` so two entities with the same op
    # (e.g. both have a "list") get distinct cached Operations. Keying
    # on opname alone caused the first-resolved entity's points to be
    # served to every subsequent entity's call.
    entname = @entity&.respond_to?(:get_name) ? @entity.get_name : "_"
    cache_key = "#{entname}:#{opname}"
    return @opmap[cache_key] if @opmap[cache_key]
    return KmailOperation.new({}) if opname.empty?

    opcfg = VoxgigStruct.getpath(@config, "entity.#{entname}.op.#{opname}")

    input = (opname == "update" || opname == "create") ? "data" : "match"

    points = []
    if opcfg.is_a?(Hash)
      t = VoxgigStruct.getprop(opcfg, "points")
      points = t if t.is_a?(Array)
    end

    op = KmailOperation.new({
      "entity" => entname,
      "name" => opname,
      "input" => input,
      "points" => points,
    })
    @opmap[cache_key] = op
    op
  end

  def make_error(code, msg)
    KmailError.new(code, msg, self)
  end
end
