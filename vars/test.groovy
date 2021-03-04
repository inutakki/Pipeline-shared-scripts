
import com.cloudbees.groovy.cps.NonCPS



@NonCPS
		def call(){
		startedByTimer = false
		def buildCauses = currentBuild.rawBuild.getCauses()
		def causeDescription
		for ( buildCause in buildCauses ) {
			if (buildCause != null) {
				if( buildCause instanceof hudson.model.Cause$UserIdCause){
					println("triggered by user")
				}
				causeDescription = buildCause.getShortDescription()
				if (causeDescription.contains("Started by timer")) {
					startedByTimer = true
				}
			}
		}
		return causeDescription
	}
